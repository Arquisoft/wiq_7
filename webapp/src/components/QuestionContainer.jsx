import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/QuestionContainer';

const QuestionContainer = ({
  shuffledAnswers,
  name,
  path,
  right,
  updateScore,
  isActive,
  onCorrectAnswer,
  loadNextQuestion,
}) => {
  // Estado para manejar las respuestas seleccionadas
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  // Efecto para reiniciar los estados cuando se carga una nueva pregunta
  useEffect(() => {
    // Restablecemos el estado al cargar una nueva pregunta
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
    setShowResult(false);
  }, [right, name, path]);

  // Efecto para seleccionar la respuesta correcta automáticamente cuando el tiempo se agota
  useEffect(() => {
    if (!isActive && selectedAnswer === null) {
      setSelectedAnswer(right); // Seleccionamos la respuesta correcta
      setShowResult(true);
    }
  }, [isActive, selectedAnswer, right]);

  // Función para manejar el clic en las respuestas
  const handleAnswerClick = (answer) => {
    if (answer === right) {
      // Si la respuesta es correcta, la seleccionamos y deshabilitamos todos los botones
      setSelectedAnswer(answer);
      onCorrectAnswer(); // Detenemos el temporizador
      setShowResult(true);
    } else {
      // Sumar 100 puntos por cada respuesta incorrecta seleccionada
      updateScore();
      setIncorrectAnswers((prev) => {
        const newIncorrectAnswers = [...prev, answer];
        // Si ya se han seleccionado 3 respuestas incorrectas, selecciona la correcta por descarte
        if (newIncorrectAnswers.length === 3) {
          setSelectedAnswer(right);
          onCorrectAnswer(); // Detenemos el temporizador
          setShowResult(true);
        }
        return newIncorrectAnswers;
      });
    }
  };

  useEffect(() => {
    if (showResult) {
      const timer = setTimeout(() => {
        loadNextQuestion(); // Cargar la siguiente pregunta después del retraso
      }, 2000); // Esperar 2 segundos antes de cargar la siguiente pregunta

      return () => clearTimeout(timer); // Limpiar el temporizador cuando se desmonte o cambie el resultado
    }
  }, [showResult]); //, loadNextQuestion]);

  return (
    <Wrapper>
      {/* Título de la obra */}
      <h3>{`¿Quién creó la obra "${name}"?`}</h3>
      {/* Imagen de la obra */}
      <div className="image">
        <img src={path} alt={name} />
      </div>
      <div>
        <h5>Descarta las respuestas incorrectas</h5>
      </div>
      {/* Renderizar botones con las respuestas */}
      <div className="buttons-container">
        {shuffledAnswers.map((answer, index) => (
          <button
            className={`btn ${
              selectedAnswer === right
                ? answer === right && incorrectAnswers.length === 3 // Marca la respuesta correcta cuando se selecciona
                  ? 'correct'
                  : 'disabled' // Deshabilita las demás cuando la correcta es seleccionada
                : incorrectAnswers.includes(answer) // Marca las respuestas incorrectas una a una
                ? 'incorrect'
                : ''
            }`}
            key={index}
            onClick={() => handleAnswerClick(answer)}
            disabled={
              selectedAnswer !== null ||
              incorrectAnswers.includes(answer) ||
              !isActive // Deshabilita
            }
          >
            {answer}
          </button>
        ))}
      </div>

      {/* Mostrar el resultado después de seleccionar */}
      {selectedAnswer && (
        <div>
          {incorrectAnswers.length === 3 ? (
            <p style={{ color: 'green' }}>
              ¡Correcto! {right} es el creador de "{name}".
            </p>
          ) : (
            <p style={{ color: 'red' }}>
              {right} es el creador de "{name}".
            </p>
          )}
        </div>
      )}
    </Wrapper>
  );
};

export default QuestionContainer;
