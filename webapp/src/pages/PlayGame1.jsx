import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/Play';
import QuestionContainer from '../components/QuestionContainer';
import ScoreContainer from '../components/ScoreContainer';
import TimerContainer from '../components/TimerContainer';
import GameOverContainer from '../components/GameOverContainer';
import useScore from '../hooks/useScore';

const PlayGame1 = ({ questions }) => {
  // Estados
  //const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Estado para almacenar las respuestas mezcladas
  const [score, updateScore] = useScore();
  const [seconds, setSeconds] = useState(20); // Estados para controlar el temporizador
  const [isActive, setIsActive] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  console.log(questions);

  // Desestructuramos la pregunta
  const { name, path, right, wrong1, wrong2, wrong3 } =
    questions[questionIndex];

  // Efecto para mezclar las respuestas al montar el componente
  useEffect(() => {
    const answers = [right, wrong1, wrong2, wrong3];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5)); // Mezcla solo una vez al cargar
  }, [right, wrong1, wrong2, wrong3]);

  // Efecto para controlar el temporizador
  useEffect(() => {
    if (seconds === 0) {
      endTimer();
    }
    if (!isActive) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, isActive]);

  // Función para detener el temporizador
  const endTimer = () => {
    setIsActive(false); // Detener el temporizador
  };

  // Función para cargar la siguiente pregunta
  const loadNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      // Si no estamos en la última pregunta, avanzamos a la siguiente
      setQuestionIndex((prevIndex) => prevIndex + 1);
      setSeconds(20); // Reiniciar el temporizador
      setIsActive(true); // Activar el temporizador
    } else {
      // Si estamos en la última pregunta, terminamos el juego
      setGameOver(true); // Cambiar estado de juego
      setSeconds(0);
    }
  };

  return (
    <Wrapper>
      {!gameOver ? (
        /* Mostrar pregunta */
        <QuestionContainer
          shuffledAnswers={shuffledAnswers}
          name={name}
          path={path}
          right={right}
          updateScore={updateScore}
          isActive={isActive}
          onCorrectAnswer={endTimer}
          loadNextQuestion={loadNextQuestion} // Cargar la siguiente pregunta
        />
      ) : (
        // Si el juego terminó, mostrar mensaje de fin
        <GameOverContainer score={score} />
      )}
      {/* Mostrar info */}
      {!gameOver && (
        <div>
          <ScoreContainer score={score} />
          <TimerContainer seconds={seconds} />
        </div>
      )}
      {gameOver && (
        <div>
          <ScoreContainer score={score} />
        </div>
      )}
    </Wrapper>
  );
};

export default PlayGame1;
