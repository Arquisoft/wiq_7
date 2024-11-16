import React, { useState, useEffect } from 'react';
import Wrapper from '../assets/wrappers/Play';
import QuestionContainer from '../components/QuestionContainer';
import ScoreContainer from '../components/ScoreContainer';
import TimerContainer from '../components/TimerContainer';
import GameOverContainer from '../components/GameOverContainer';
import useScore from '../hooks/useScore';

const PlayGame1 = ({ questions }) => {
  // Estados
  const [questionIndex, setQuestionIndex] = useState(0);
  const [shuffledAnswers, setShuffledAnswers] = useState([]); // Estado para almacenar las respuestas mezcladas
  const [score, updateScore] = useScore();
  const [seconds, setSeconds] = useState(20); // Estados para controlar el temporizador
  const [isActive, setIsActive] = useState(true);
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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
      setTimer(false);
      setIsTimeOut(true);
    }
    if (!isActive) {
      return;
    }
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, isActive]);

  // Funciones para controlar el temporizador
  const setTimer = (state) => {
    setIsActive(state);
  };
  const restartTimer = () => {
    setSeconds(20);
    setIsTimeOut(false);
  };

  // Función para cargar la siguiente pregunta
  const loadNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      // Si no estamos en la última pregunta, avanzamos a la siguiente
      setQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // Si estamos en la última pregunta, terminamos el juego
      setGameOver(true); // Cambiar estado de juego
      setSeconds(0);
    }
  };

  return (
    <Wrapper>
      {!gameOver ? (
        <>
          {/* Mostrar pregunta */}
          <QuestionContainer
            shuffledAnswers={shuffledAnswers}
            name={name}
            path={path}
            right={right}
            updateScore={updateScore}
            isActive={isActive}
            isTimeOut={isTimeOut}
            setTimer={setTimer}
            restartTimer={restartTimer}
            loadNextQuestion={loadNextQuestion} // Cargar la siguiente pregunta
          />
          {/* Mostrar info */}
          <div>
            <ScoreContainer score={score} />
            <TimerContainer seconds={seconds} />
          </div>
        </>
      ) : (
        // Si el juego terminó, mostrar mensaje de fin
        <>
          <GameOverContainer score={score} />
          <div>
            <ScoreContainer score={score} />
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default PlayGame1;
