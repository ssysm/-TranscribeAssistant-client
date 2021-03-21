import {
  BrowserRouter,
    Switch,
    Route,
    Link
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import WaitingPage from './pages/WaitingPage';
import ViewTrackPage from './pages/ViewTrackPage';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <HomePage />
        </Route>
        <Route path='/wait/:id'>
          <WaitingPage/>
        </Route>
        <Route path='/view-track/:id'>
          <ViewTrackPage/>
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
