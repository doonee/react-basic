import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
import Navbar from "./components/NavBar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
