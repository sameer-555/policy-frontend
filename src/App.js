import "./styles.css";
import PolicyList from "./PolicyList";
import PolicyEdit from "./PolicyEdit";
import Chart from "./Chart";
import { Route, Switch } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={PolicyList} exact />
        <Route path="/chart" component={Chart} />
        <Route path="/:slug" component={PolicyEdit} />
      </Switch>
    </div>
  );
}
