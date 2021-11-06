import React from 'react';
import routes from '../shared/routes';
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Navbar from './Navbar'
import NoMatch from './NoMatch'

const App = () => {
    return <div>
        <Navbar />
        <Switch>
          {routes.map(({ path, exact, component: Component, ...rest }) => (
            <Route key={path} path={path} exact={exact} render={(props) => (
              <Component {...props} {...rest} />
            )} />
          ))}
          <Route render={(props) => <NoMatch {...props} /> } />
        </Switch>
    </div>
}

export default App;