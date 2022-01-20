import { BrowserRouter, Route, Switch } from "react-router-dom";
import Airtable from "./Airtable";
import Product from "./Product";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Airtable} />
        <Route path="/:productID" exact component={Product} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
