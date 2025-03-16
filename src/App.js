import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/landing/landing.jsx";
import Home from "./components/Home/Home.jsx";
import Detail from "./components/detail/detail.jsx";
import Form from "./components/form/Form.jsx";

function App() {
  //Routes => permite usar todas las rutas y rutas anidadas(proceso de dirigir solicitudes URL)
  //Route => configurar enrutamiento de mis componentes
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route exact path="/dog" element={<Form />} />
      </Routes>
    </div>
  );
}

export default App;
