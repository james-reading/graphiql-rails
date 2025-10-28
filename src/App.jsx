import { GraphiQL } from 'graphiql';
import { createGraphiQLFetcher } from '@graphiql/toolkit'
import { createConsumer } from "@rails/actioncable"
import createActionCableFetcher from 'graphql-ruby-client/subscriptions/createActionCableFetcher';
import 'graphiql/style.css';


const config = window.APP_CONFIG || {};

console.log("GraphiQL-Rails Config:", config);

let fetcher;
if (config.action_cable_path) {
  const actionCable = createConsumer(config.action_cable_path);

  fetcher = createActionCableFetcher({
    consumer: actionCable,
    url: config.graphql_endpoint_path,
    channelName: config.action_cable_channel_name
  });
} else {
  fetcher = createGraphiQLFetcher({
    url: config.graphql_endpoint_path
  });
}

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
    defaultQuery: config.initial_query,
    defaultHeaders: JSON.stringify(config.headers, null, 2),
    isHeadersEditorEnabled: config.header_editor_enabled,
    inputValueDeprecation: config.input_value_deprecation,
    shouldPersistHeaders: config.should_persist_headers,
  };

  if (config.query_params) {
    const urlParams = getUrlParams();

    Object.assign(graphiqlProps, {
      initialQuery: urlParams.query,
      initialVariables: urlParams.variables,
      onEditQuery: onEditQuery,
      onEditVariables: onEditVariables
    });
  }

  return <GraphiQL {...graphiqlProps}>
    <GraphiQL.Logo>
      {config.logo || undefined}
    </GraphiQL.Logo>
  </GraphiQL>;
}

export default App;
