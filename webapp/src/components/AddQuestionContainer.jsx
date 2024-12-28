import React, { useState } from 'react';
import axios from 'axios';
import Wrapper from '../assets/wrappers/MenuItem';
import { Snackbar } from '@mui/material';
import SPARQLQueryDispatcher from '../utils/SPARQLQueryDispatcher';
import { paintingsQuery, sculpturesQuery } from '../utils/artworksQuery';

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
    const token = localStorage.getItem('token');
    await axios.post(
      `${apiEndpoint}/addquestion`,
      {
        type,
        name,
        path,
        right,
        wrong1,
        wrong2,
        wrong3,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const getRandomCreators = (allCreators, correctCreator, count) => {
    const filteredCreators = allCreators.filter(
      (creator) => creator !== correctCreator && !creator.startsWith('http')
    );
    const randomCreators = [];
    while (randomCreators.length < count) {
      const randomCreator =
        filteredCreators[Math.floor(Math.random() * filteredCreators.length)];
      if (!randomCreators.includes(randomCreator)) {
        randomCreators.push(randomCreator);
      }
    }
    return randomCreators;
  };

  const generateArtworks = async (query) => {
    try {
      const response = await queryDispatcher.query(query);
      const bindings = response.results.bindings;
      const allCreators = bindings.map((result) => result.creatorLabel.value);

      for (const result of bindings) {
        const name = result.workLabel.value; // Título de la obra
        const path = result.image.value; // URL de la imagen
        const right = result.creatorLabel.value; // Nombre del creador
        const wrongCreators = getRandomCreators(allCreators, right, 3);

        // Añade las preguntas a la base de datos
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
    } catch (error) {
      setError(
        error.response?.data?.msg ||
          'An error occurred when generating the questions'
      );
    }
  };

  const generateQuestions = async (query) => {
    setIsSubmitting(true);
    try {
      await Promise.all([
        generateArtworks(paintingsQuery),
        generateArtworks(sculpturesQuery),
      ]);
      setOpenSnackbar(true);
    } catch (error) {
      setError(
        error.response?.data?.msg ||
          'An error occurred when generating the questions'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Wrapper>
      <header>
        <div className="info">
          <h5>Update "Por su obra..."</h5>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <p>Add questions to the database</p>
        </div>
        <footer className="actions">
          <button
            type="submit"
            className="btn update-btn"
            onClick={generateQuestions}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'updating...' : 'update DB'}
          </button>
        </footer>
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
