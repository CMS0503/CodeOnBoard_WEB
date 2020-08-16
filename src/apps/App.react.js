import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/Home.react";
import ProblemList from "./main/ProblemList.react"
import Problem from "./main/problem/Problem.react"
import * as problemNav from "./main/problem" 
import login from "apps/login/login.react"
import "tabler-react/dist/Tabler.css";

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/problem" component={ProblemList} />
          <Route exact path="/problem/:id" component={Problem} />
          <Route exact path="/replay/:id" component={problemNav.Replay} />
          <Route exact path="/match/:id" component={problemNav.Match} />
          <Route exact path="/code/my/" component={problemNav.CodeList} />
          <Route exact path="/matchlog/:id" component={problemNav.Matchlog} />
          <Route exact path="/login" component={login} />
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
