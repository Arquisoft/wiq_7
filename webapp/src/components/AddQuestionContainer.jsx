import React, { useState } from 'react';
import axios from 'axios';
import Wrapper from '../assets/wrappers/AddQuestionContainer.js';
import { Snackbar } from '@mui/material';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
import artworksQuery from '../utils/artworksQuery';

const endpointUrl = 'https://query.wikidata.org/sparql';
const queryDispatcher = new SPARQLQueryDispatcher(endpointUrl);
const apiEndpoint =
  process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddQuestionContainer = () => {
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addQuestion = async ({
    type,
    name,
    path,
    right,
    wrong1,
    wrong2,
    wrong3,
  }) => {
    try {
      await axios.post(`${apiEndpoint}/addquestion`, {
        type,
        name,
        path,
        right,
        wrong1,
        wrong2,
        wrong3,
      });
      setOpenSnackbar(true);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.error);
    }
  };

  const generateArtworks = async () => {
    setIsSubmitting(true);
    try {
      const query = await queryDispatcher.query(artworksQuery);
      // handle results
      const bindings = query.results.bindings;
      // Crear un array para almacenar todas las posibles opciones de creadores
      const allCreators = bindings.map((result) => result.creatorLabel.value);
      for (const result of bindings) {
        // Accedemos a cada propiedad
        const name = result.workLabel.value; // Título de la obra
        const path = result.image.value; // URL de la imagen
        const right = result.creatorLabel.value; // Nombre del creador

        // Filtrar creadores para obtener solo los que sean diferentes a la respuesta correcta
        const incorrectCreators = allCreators.filter(
          (creator) => creator !== right
        );

        // Seleccionar tres opciones incorrectas de manera aleatoria
        const wrongCreators = [];
        while (wrongCreators.length < 3) {
          const randomCreator =
            incorrectCreators[
              Math.floor(Math.random() * incorrectCreators.length)
            ];

          // Agregar solo si no está ya en la lista de opciones incorrectas
          if (
            !wrongCreators.includes(randomCreator) &&
            !randomCreator.startsWith('http')
          ) {
            wrongCreators.push(randomCreator);
          }
        }

        // Muestra los resultados en la consola
        if (!name.startsWith('http') && !right.startsWith('http')) {
          await addQuestion({
            type: 'artwork',
            name: name,
            path: path,
            right: right,
            wrong1: wrongCreators[0],
            wrong2: wrongCreators[1],
            wrong3: wrongCreators[2],
          });
        }
      }
      setOpenSnackbar(true);
    } catch (error) {
      console.log('error');
      setError(error.response?.data?.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Wrapper>
      <div className="generateDb">
        <h4>Update "Por su obra..."</h4>
        <button
          type="submit"
          className="btn btn-block"
          onClick={generateArtworks}
          disabled={isSubmitting} // Deshabilitar el botón mientras está enviando
        >
          {isSubmitting ? 'updating...' : 'update DB'}
        </button>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="Questions generated successfully"
      />
      {error && (
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError('')}
          message={`Error: ${error}`}
        />
      )}
    </Wrapper>
  );
};

export default AddQuestionContainer;
