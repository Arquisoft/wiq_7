import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayGame1 from './PlayGame1';

const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Play = () => {
  // Estados
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Recuperando las preguntas
  useEffect(() => {
    // Función asíncrona para obtener los documentos
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get(`${apiEndpoint}/game-questions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data); // Actualizamos el estado con los datos
      } catch (error) {
        console.error('Error al obtener las preguntas:', error);
      } finally {
        setLoading(false); // Marcamos la carga como completada
      }
    };

    fetchQuestions(); // Llamada a la función de carga
  }, []);

  return (
    <div>
      {loading ? (
        <p>Cargando preguntas...</p>
      ) : // Verifica si documents tiene al menos un elemento antes de acceder
      questions.length > 0 ? (
        <PlayGame1 questions={questions} />
      ) : (
        <p>No hay preguntas disponibles</p>
      )}
    </div>
  );
};
export default Play;
