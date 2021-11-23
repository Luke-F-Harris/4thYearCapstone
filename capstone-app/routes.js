import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from "./components/App";
import HomePage from './components/HomePage';
import ProfilePage from './components/ProfilePage';
import GamePage from './components/GamePage';
import LeaderBoard from './components/LeaderBoard';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/some/where" component={ProfilePage} />
    <Route path="/some/otherpage" component={LeaderBoard} />
  </Route>
);