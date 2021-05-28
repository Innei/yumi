import { PlaceHolderPage } from 'pages/placeholder'
import { Fragment, FC } from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
export function App() {
  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Yumi</title>
      </Helmet>
      <RouterPath />
    </Fragment>
  )
}

const RouterPath: FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <PlaceHolderPage />
        </Route>
        <Route path="/users">
          <PlaceHolderPage />
        </Route>
        <Route path="/">
          <PlaceHolderPage />
        </Route>
      </Switch>
    </Router>
  )
}
