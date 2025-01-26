import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css"; 
import UsuariosPage from "./pages/UsuariosPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import CursosComponent from "./pages/CursosPage";
import MatriculasComponent from "./pages/MatriculaPage";

function App() {
  return (
    <div className="App">
      <Navbar/>    
      
      <BrowserRouter> 
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/estudiantes" element={<UsuariosPage/>} />   
          <Route path="/cursos" element={<CursosComponent/>} />  
          <Route path="/matriculas" element={<MatriculasComponent/>} />                
        </Routes>          
      </BrowserRouter>

      <Footer/>  
    </div>

  );
}

export default App;