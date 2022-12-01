import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Login, Addjob, Profile, Stats } from "./pages";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/addjob" element={<Addjob />}></Route>
            <Route path="/stats" element={<Stats />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </div>
  );
}

export default App;
