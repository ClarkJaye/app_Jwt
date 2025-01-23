import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="d-flex flex-column">
      <Outlet/>
    </div>
  );
}

export default App