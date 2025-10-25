import { GraphiQL } from 'graphiql';
import 'graphiql/style.css';
import { createGraphiQLFetcher } from '@graphiql/toolkit'

const fetcher = createGraphiQLFetcher({ url: '/v1/graphql' });

function App() {
  return <GraphiQL fetcher={fetcher} />;
}

export default App;
