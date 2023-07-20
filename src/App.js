import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <div className="mb-3">
        <label htmlFor="" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <button className="btn btn-primary">Post</button>
    </div>
  );
}

export default App;
