import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsuariosPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nuevoEstudiante, setNuevoEstudiante] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    telefono: ''
  });

  const [estudianteEditar, setEstudianteEditar] = useState(null);  // Estado para el estudiante que se está editando

  const API_URL = 'http://localhost:8002/api/estudiantes';

  const listarEstudiantes = async () => {
    try {
      const response = await axios.get(API_URL);
      setEstudiantes(response.data);
    } catch (error) {
      console.error('Error al listar estudiantes:', error);
    }
  };

  const handleCrearEstudiante = async () => {
    try {
      const response = await axios.post(API_URL, nuevoEstudiante);
      setEstudiantes([...estudiantes, response.data]);
      setNuevoEstudiante({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: '',
        telefono: ''
      });
    } catch (error) {
      console.error('Error al crear estudiante:', error);
    }
  };

  const handleEliminarEstudiante = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEstudiantes(estudiantes.filter((est) => est.id !== id));
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
    }
  };

  const handleEditarEstudiante = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setEstudianteEditar(response.data);
    } catch (error) {
      console.error('Error al obtener estudiante:', error);
    }
  };

  const handleActualizarEstudiante = async () => {
    if (estudianteEditar) {
      try {
        const response = await axios.put(`${API_URL}/${estudianteEditar.id}`, estudianteEditar);
        setEstudiantes(estudiantes.map((est) => (est.id === response.data.id ? response.data : est)));
        setEstudianteEditar(null);  // Limpiar el formulario de edición
      } catch (error) {
        console.error('Error al actualizar estudiante:', error);
      }
    }
  };

  useEffect(() => {
    listarEstudiantes();
  }, []);

  // Estilos en línea
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
    },
    heading: {
      color: '#333',
      marginBottom: '20px',
    },
    list: {
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '5px',
    },
    actions: {
      display: 'flex',
    },
    button: {
      padding: '8px 12px',
      marginLeft: '5px',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    btnSuccess: {
      backgroundColor: '#28a745',
      color: 'white',
    },
    btnDanger: {
      backgroundColor: '#dc3545',
      color: 'white',
    },
    btnWarning: {
      backgroundColor: '#ffc107',
      color: 'white',
    },
    formContainer: {
      marginTop: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: '10px',
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    formActions: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Lista de Estudiantes</h2>
      <ul style={styles.list}>
        {estudiantes.map((estudiante) => (
          <li key={estudiante.id} style={styles.listItem}>
            {estudiante.nombre} {estudiante.apellido} - {estudiante.email}
            <div style={styles.actions}>
              <button
                style={{ ...styles.button, ...styles.btnDanger }}
                onClick={() => handleEliminarEstudiante(estudiante.id)}
              >
                Eliminar
              </button>
              <button
                style={{ ...styles.button, ...styles.btnWarning }}
                onClick={() => handleEditarEstudiante(estudiante.id)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 style={styles.heading}>{estudianteEditar ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h2>
      <div style={styles.formContainer}>
        <form style={styles.form}>
          <label htmlFor="nombre" style={styles.label}>Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={estudianteEditar ? estudianteEditar.nombre : nuevoEstudiante.nombre}
            onChange={(e) => {
              const value = e.target.value;
              if (estudianteEditar) {
                setEstudianteEditar({ ...estudianteEditar, nombre: value });
              } else {
                setNuevoEstudiante({ ...nuevoEstudiante, nombre: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="apellido" style={styles.label}>Apellido</label>
          <input
            type="text"
            id="apellido"
            placeholder="Apellido"
            value={estudianteEditar ? estudianteEditar.apellido : nuevoEstudiante.apellido}
            onChange={(e) => {
              const value = e.target.value;
              if (estudianteEditar) {
                setEstudianteEditar({ ...estudianteEditar, apellido: value });
              } else {
                setNuevoEstudiante({ ...nuevoEstudiante, apellido: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={estudianteEditar ? estudianteEditar.email : nuevoEstudiante.email}
            onChange={(e) => {
              const value = e.target.value;
              if (estudianteEditar) {
                setEstudianteEditar({ ...estudianteEditar, email: value });
              } else {
                setNuevoEstudiante({ ...nuevoEstudiante, email: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="fechaNacimiento" style={styles.label}>Fecha de Nacimiento</label>
          <input
            type="date"
            id="fechaNacimiento"
            placeholder="Fecha de Nacimiento"
            value={estudianteEditar ? estudianteEditar.fechaNacimiento : nuevoEstudiante.fechaNacimiento}
            onChange={(e) => {
              const value = e.target.value;
              if (estudianteEditar) {
                setEstudianteEditar({ ...estudianteEditar, fechaNacimiento: value });
              } else {
                setNuevoEstudiante({ ...nuevoEstudiante, fechaNacimiento: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="telefono" style={styles.label}>Teléfono</label>
          <input
            type="text"
            id="telefono"
            placeholder="Teléfono"
            value={estudianteEditar ? estudianteEditar.telefono : nuevoEstudiante.telefono}
            onChange={(e) => {
              const value = e.target.value;
              if (estudianteEditar) {
                setEstudianteEditar({ ...estudianteEditar, telefono: value });
              } else {
                setNuevoEstudiante({ ...nuevoEstudiante, telefono: value });
              }
            }}
            style={styles.input}
          />

          <div style={styles.formActions}>
            {estudianteEditar ? (
              <button
                type="button"
                style={{ ...styles.button, ...styles.btnSuccess }}
                onClick={handleActualizarEstudiante}
              >
                Actualizar Estudiante
              </button>
            ) : (
              <button
                type="button"
                style={{ ...styles.button, ...styles.btnPrimary }}
                onClick={handleCrearEstudiante}
              >
                Crear Estudiante
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsuariosPage;
