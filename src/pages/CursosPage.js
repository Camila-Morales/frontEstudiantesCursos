import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CursosComponent = () => {
  const [cursos, setCursos] = useState([]);
  const [nuevoCurso, setNuevoCurso] = useState({
    nombre: '',
    descripcion: '',
    creditos: 0,
  });

  const [cursoEditar, setCursoEditar] = useState(null);  // Estado para el curso que se está editando
  const [estudianteId, setEstudianteId] = useState(null); // Estado para el ID del estudiante al agregar a un curso
  const [cursoId, setCursoId] = useState(null); // Estado para el ID del curso seleccionado al agregar estudiante

  const API_URL = process.env.REACT_APP_API_URL + '/cursos';

  const listarCursos = async () => {
    try {
      const response = await axios.get(API_URL);
      setCursos(response.data);
    } catch (error) {
      console.error('Error al listar cursos:', error);
    }
  };

  const handleCrearCurso = async () => {
    try {
      const response = await axios.post(API_URL, nuevoCurso);
      setCursos([...cursos, response.data]);
      setNuevoCurso({
        nombre: '',
        descripcion: '',
        creditos: 0,
      });
    } catch (error) {
      console.error('Error al crear curso:', error);
    }
  };

  const handleEliminarCurso = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setCursos(cursos.filter((curso) => curso.id !== id));
    } catch (error) {
      console.error('Error al eliminar curso:', error);
    }
  };

  const handleEditarCurso = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      setCursoEditar(response.data);
    } catch (error) {
      console.error('Error al obtener curso:', error);
    }
  };

  const handleActualizarCurso = async () => {
    if (cursoEditar) {
      try {
        const response = await axios.put(`${API_URL}/${cursoEditar.id}`, cursoEditar);
        setCursos(cursos.map((curso) => (curso.id === response.data.id ? response.data : curso)));
        setCursoEditar(null);  // Limpiar el formulario de edición
      } catch (error) {
        console.error('Error al actualizar curso:', error);
      }
    }
  };

  const handleAgregarEstudiante = async () => {
    if (estudianteId && cursoId) {
      try {
        const response = await axios.post(`${API_URL}/${cursoId}`, { id: estudianteId });
        alert('Estudiante agregado correctamente');
      } catch (error) {
        console.error('Error al agregar estudiante al curso:', error);
        alert('Error al agregar estudiante');
      }
    }
  };

  useEffect(() => {
    listarCursos();
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
      <h2 style={styles.heading}>Lista de Cursos</h2>
      <ul style={styles.list}>
        {cursos.map((curso) => (
          <li key={curso.id} style={styles.listItem}>
            {curso.nombre} - {curso.descripcion} - {curso.creditos} créditos
            <div style={styles.actions}>
              <button
                style={{ ...styles.button, ...styles.btnDanger }}
                onClick={() => handleEliminarCurso(curso.id)}
              >
                Eliminar
              </button>
              <button
                style={{ ...styles.button, ...styles.btnWarning }}
                onClick={() => handleEditarCurso(curso.id)}
              >
                Editar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2 style={styles.heading}>{cursoEditar ? 'Editar Curso' : 'Nuevo Curso'}</h2>
      <div style={styles.formContainer}>
        <form style={styles.form}>
          <label htmlFor="nombre" style={styles.label}>Nombre</label>
          <input
            type="text"
            id="nombre"
            placeholder="Nombre"
            value={cursoEditar ? cursoEditar.nombre : nuevoCurso.nombre}
            onChange={(e) => {
              const value = e.target.value;
              if (cursoEditar) {
                setCursoEditar({ ...cursoEditar, nombre: value });
              } else {
                setNuevoCurso({ ...nuevoCurso, nombre: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="descripcion" style={styles.label}>Descripción</label>
          <input
            type="text"
            id="descripcion"
            placeholder="Descripción"
            value={cursoEditar ? cursoEditar.descripcion : nuevoCurso.descripcion}
            onChange={(e) => {
              const value = e.target.value;
              if (cursoEditar) {
                setCursoEditar({ ...cursoEditar, descripcion: value });
              } else {
                setNuevoCurso({ ...nuevoCurso, descripcion: value });
              }
            }}
            style={styles.input}
          />

          <label htmlFor="creditos" style={styles.label}>Créditos</label>
          <input
            type="number"
            id="creditos"
            placeholder="Créditos"
            value={cursoEditar ? cursoEditar.creditos : nuevoCurso.creditos}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (cursoEditar) {
                setCursoEditar({ ...cursoEditar, creditos: value });
              } else {
                setNuevoCurso({ ...nuevoCurso, creditos: value });
              }
            }}
            style={styles.input}
          />

          <div style={styles.formActions}>
            {cursoEditar ? (
              <button
                type="button"
                style={{ ...styles.button, ...styles.btnSuccess }}
                onClick={handleActualizarCurso}
              >
                Actualizar Curso
              </button>
            ) : (
              <button
                type="button"
                style={{ ...styles.button, ...styles.btnPrimary }}
                onClick={handleCrearCurso}
              >
                Crear Curso
              </button>
            )}
          </div>
        </form>
      </div>

    </div>
  );
};

export default CursosComponent;