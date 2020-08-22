import * as React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./main/Home.react";
import ProblemList from "./main/ProblemList.react"
import Problem from "./main/problem/Problem.react"
import Replay from "./main/Replay/replay.react" 
import Match from "./main/match/match.react"
import CodeList from "./main/codeList.react"
import Matchlog from "./main/matchlog.react"
import Login from "./login/login.react"
import login2 from "./components/authentication/LoginPage"
import Ranking from "./main/ranking.react"
import "tabler-react/dist/Tabler.css";
import RankingProblem from "./main/rankingProblem/rankingProblem.react";

import AddGame from "./main/addGame/addGame.react"
import test from "./test.js"

function App(props: Props): React.Node {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/problem" component={ProblemList} />
          <Route exact path="/problem/:id" component={Problem} />
          <Route exact path="/replay/:id" component={Replay} />
          <Route exact path="/match/:id" component={Match} />
          <Route exact path="/code/my/" component={CodeList} />
          <Route exact path="/matchlog/:id" component={Matchlog} />
          {/* <Route exact path="/login" component={Login} /> */}
          <Route exact path="/login" component={login2} />
          <Route exact path="/rankingProblem/:id" component={RankingProblem} />
          <Route exact path="/ranking" component={Ranking} />
          <Route exact path="/addGame" component={AddGame} />
          <Route exact path="/test" component={test} />
          
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;

