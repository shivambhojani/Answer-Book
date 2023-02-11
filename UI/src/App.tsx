import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import NavBar from "./NavBar";
import Routing from "./Routing";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { Provider } from "react-redux";

function App() {
  const location = useLocation();

  return (
    <Provider store={store}>
      {localStorage.getItem("userID") ? <NavBar /> : null}
      <Routing />
      <ToastContainer />
    </Provider>
  );
}

export default App;
