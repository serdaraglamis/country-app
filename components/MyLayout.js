import Head from 'next/head';

import Header from './Header';

function MetaTag(props) {
  switch (props.page) {
    case 'home':
      return <meta name="description" content="Rest Countries App" />;
    case 'detail':
      return <meta name="description" content="Rest Country Details with ID" />;
    default:
      return <meta name="description" content="Rest Countries App" />;
  }
}

const Layout = props => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <MetaTag page={props.page} />

      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />
    </Head>
    <Header />
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;
