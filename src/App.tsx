import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { Home } from './pages/home';

import { Landing } from './pages/landing';
import { NewTask } from './pages/new-task';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/home" exact component={Home} />
            <Route path="/new-task" exact component={NewTask} />
          </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
