import {useState, useEffect} from 'react';
import Error from './Error';

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [alta, setAlta] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {

    if( Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropietario(paciente.propietario);
      setEmail(paciente.email);
      setAlta(paciente.alta);
      setSintomas(paciente.sintomas);    
    }
  }, [paciente])

  const generarId = () => {
    const date = Date.now().toString(36)
    const random = Math.random().toString(36).substr(2);
    return date + random;
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    // Validación del formulario
    if([nombre, propietario, email, alta, sintomas].includes('')) {
      setError(true);
    } else {
      setError(false);

      // Agregar pacientes
      const pacienteObjeto = {
        nombre,
        propietario, 
        email, 
        alta, 
        sintomas,
      }

      if(paciente.id) {
        pacienteObjeto.id = paciente.id;

        const pacientesActualizados = pacientes.map(p => pacienteObjeto.id === p.id ? pacienteObjeto : p);

        setPacientes(pacientesActualizados);
        setPaciente({})
      } else {
        pacienteObjeto.id = generarId();
        setPacientes([...pacientes, pacienteObjeto]);
      }


      // Reiniciar valores inputs
      setNombre('');
      setPropietario('');
      setEmail('');
      setAlta('');
      setSintomas('');
    }
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Adminístralos</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}
        <div className="mb-5">
          <label htmlFor="nombre" className="block text-gray-700 uppercase font-bold">Nombre Paciente</label>

          <input
            id="nombre" 
            type="text"
            placeholder="Nombre del Paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>

          <input
            id="propietario" 
            type="text"
            placeholder="Nombre del Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={e => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>

          <input
            id="email" 
            type="email"
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>

          <input
            id="alta" 
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={alta}
            onChange={e => setAlta(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>

          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los Síntomas"
            value={sintomas}
            onChange={e => setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? 'Editar Paciente' : 'Agregar paciente'} 
        />
      </form>
    </div>
  )
}

export default Formulario