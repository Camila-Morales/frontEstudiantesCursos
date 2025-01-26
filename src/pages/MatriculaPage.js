import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatriculasPage = () => {
  const [estudiantes, setEstudiantes] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [estudianteId, setEstudianteId] = useState('');
  const [cursoId, setCursoId] = useState('');
  const [mensaje, setMensaje] = useState('');

  const API_URL = 'http://localhost:8003/api';
  const API_URL2 = 'http://localhost:8002/api';

  useEffect(() => {
    const fetchEstudiantes = async () => {
      try {
        const response = await axios.get(`${API_URL2}/estudiantes`);
        setEstudiantes(response.data);
      } catch (error) {
        console.error('Error al obtener estudiantes:', error);
      }
    };

    const fetchCursos = async () => {
      try {
        const response = await axios.get(`${API_URL}/cursos`);
        setCursos(response.data);
      } catch (error) {
        console.error('Error al obtener cursos:', error);
      }
    };

    fetchEstudiantes();
    fetchCursos();
  }, []);

  const handleAgregarEstudiante = async () => {
    if (estudianteId && cursoId) {
      try {
        await axios.post(`${API_URL}/cursos/${cursoId}`, { id: estudianteId });
        setMensaje('Estudiante agregado correctamente al curso.');
        const updatedCursos = await axios.get(`${API_URL}/cursos`);
        setCursos(updatedCursos.data);
      } catch (error) {
        console.error('Error al agregar estudiante al curso:', error);
        setMensaje('Error al agregar estudiante.');
      }
    } else {
      setMensaje('Por favor seleccione un estudiante y un curso.');
    }
  };

  const handleEliminarMatricula = async (cursoId, estudianteId) => {
    try {
      await axios.delete(`${API_URL}/cursos/eliminar-del-curso/${cursoId}/usuario/${estudianteId}`);
      setMensaje('Matrícula eliminada correctamente.');
      const updatedCursos = await axios.get(`${API_URL}/cursos`);
      setCursos(updatedCursos.data);
    } catch (error) {
      console.error('Error al eliminar matrícula:', error);
      setMensaje('Error al eliminar matrícula.');
    }
  };  

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
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    },
    input: {
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 15px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
    },
    btnPrimary: {
      backgroundColor: '#007bff',
      color: 'white',
    },
    btnDanger: {
      backgroundColor: '#dc3545',
      color: 'white',
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
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Gestión de Matrículas</h2>

      <div>
        <h3 style={styles.heading}>Agregar Estudiante a un Curso</h3>
        <form style={styles.form}>
          <select
            value={estudianteId}
            onChange={(e) => setEstudianteId(e.target.value)}
            style={styles.input}
          >
            <option value="">Seleccione un estudiante</option>
            {estudiantes.map((estudiante) => (
              <option key={estudiante.id} value={estudiante.id}>
                {`${estudiante.id} - ${estudiante.nombre} ${estudiante.apellido}`}
              </option>
            ))}
          </select>

          <select
            value={cursoId}
            onChange={(e) => setCursoId(e.target.value)}
            style={styles.input}
          >
            <option value="">Seleccione un curso</option>
            {cursos.map((curso) => (
              <option key={curso.id} value={curso.id}>
                {`${curso.id} - ${curso.nombre}`}
              </option>
            ))}
          </select>

          <button
            type="button"
            style={{ ...styles.button, ...styles.btnPrimary }}
            onClick={handleAgregarEstudiante}
          >
            Agregar Estudiante
          </button>
        </form>
        {mensaje && <p>{mensaje}</p>}
      </div>

      <div>
        <h3 style={styles.heading}>Matrículas Existentes</h3>
        <ul style={styles.list}>
          {cursos.map((curso) => (
            <li key={curso.id} style={styles.listItem}>
              <div>
                <strong>{curso.nombre}</strong>
                <ul style={{ ...styles.list, marginTop: '10px' }}>
                  {curso.cursoEstudiantes.map((matricula) => (
                    <li key={matricula.id} style={styles.listItem}>
                      {`Estudiante ID: ${matricula.estudianteId}`}
                      <button
                        style={{ ...styles.button, ...styles.btnDanger }}
                        onClick={() => handleEliminarMatricula(curso.id, matricula.estudianteId)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MatriculasPage;
