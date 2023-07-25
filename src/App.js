import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar";
import Toast from "./components/Toast";
import useToast from "./hooks/useToast";
import routes from "./routes";

function App() {
  const toasts = useSelector((state) => state.toast.toasts);
  const { deleteToast } = useToast(); // 순서를 반드시 지킨다!! (이름은 무관)
  // 실수가 많은 코드파일럿이 생성해준 대로 했다가 2시간 삽질함. 순서 지켜야 함.

  return (
    <Router>
      <Navbar />
      <Toast toasts={toasts} deleteToast={deleteToast} />
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
