import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit'
import 'graphiql/style.css';

console.log(window.APP_CONFIG);


const fetcher = createGraphiQLFetcher({
  url: window.APP_CONFIG?.graphql_endpoint_path
});

function getUrlParams() {
  const params = new URLSearchParams(window.location.search);

  return {
    query: params.get('query'),
    variables: params.get('variables')
  };
}

function updateUrlParams(query, variables) {
  const url = new URL(window.location.href);

  if (query && query.trim()) {
    url.searchParams.set("query", query);
  } else {
    url.searchParams.delete("query");
  }

  if (variables && variables.trim()) {
    url.searchParams.set("variables", variables);
  } else {
    url.searchParams.delete("variables");
  }

  window.history.replaceState({}, "", url);
}

function onEditQuery(newQuery) {
  const currentVariables = getUrlParams().variables;
  updateUrlParams(newQuery, currentVariables);
};

function onEditVariables(newVariables) {
  const currentQuery = getUrlParams().query;
  updateUrlParams(currentQuery, newVariables);
};

function App() {
  const graphiqlProps = {
    fetcher,
    defaultQuery: window.APP_CONFIG?.initial_query,
    defaultHeaders: JSON.stringify(window.APP_CONFIG?.headers, null, 2),
    isHeadersEditorEnabled: window.APP_CONFIG?.header_editor_enabled,
    inputValueDeprecation: window.APP_CONFIG?.input_value_deprecation,
    shouldPersistHeaders: window.APP_CONFIG?.should_persist_headers,
  };

  if (window.APP_CONFIG?.query_params) {
    const urlParams = getUrlParams();
    graphiqlProps.initialQuery = urlParams.query;
    graphiqlProps.initialVariables = urlParams.variables;
    graphiqlProps.onEditQuery = onEditQuery;
    graphiqlProps.onEditVariables = onEditVariables;
  }

  return <GraphiQL {...graphiqlProps}>
    <GraphiQL.Logo>
      {window.APP_CONFIG?.logo || undefined}
    </GraphiQL.Logo>
  </GraphiQL>;
}

export default App;
