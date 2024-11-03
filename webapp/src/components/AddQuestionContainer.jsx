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

  const addQuestion = async ({ type, path, right }) => {
    try {
      await axios.post(`${apiEndpoint}/addquestion`, { type, path, right });
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
      for (const result of bindings) {
        // Accedemos a cada propiedad
        const workLabel = result.workLabel.value; // Título de la obra
        const creator = result.creatorLabel.value; // Nombre del creador
        const imageUrl = result.image.value; // URL de la imagen
        const sitelinks = result.sitelinks.value; // Número de sitelinks

        // Muestra los resultados en la consola
        if (!workLabel.startsWith('http') && !creator.startsWith('http')) {
          await addQuestion({
            type: 'artwork',
            path: workLabel,
            right: creator,
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
