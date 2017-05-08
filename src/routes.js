import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Page = ({ children }) => (<div>{children}</div>);
const HomePage = () => (<div>Hello boots the house down</div>);
const BeersPage = () => <div>beers beers beers!</div>;

const Routes = () => (
  <Page>
    <Route exact path="/" component={HomePage} />
    <Route path={'/beers'} component={BeersPage} />
  </Page>
);

export default Routes;