import { useEffect } from "react";
import { useState } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
  const [ pacientes, setPacientes ] = useState(pacientesLS);
  const [ paciente, setPaciente ] = useState({});
  
  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter(p => p.id !== id);

    setPacientes(pacientesActualizados);
  }

  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])

  return (
    <div className="container mx-auto mt-20">
        <Header />
        <div className="mt-12 md:flex">
          <Formulario paciente={paciente} setPaciente={setPaciente} pacientes={pacientes} setPacientes={setPacientes}/>
          <ListadoPacientes eliminarPaciente={eliminarPaciente} pacientes={pacientes} setPaciente={setPaciente}/>
        </div>
    </div>
  )
}

export default App
