// src/ExamComponent.js

import React, { useState } from 'react';
import Header from '../common/header/Header';
import './ExamComponent.css';
const questions = [
  { prompt: 'What is the capital of France?', answer: 'Paris' },
  { prompt: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  // ... add more questions
];

const ExamComponent = () => {
  const [transcript, setTranscript] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [submitPrompt, setSubmitPrompt] = useState(false);

  const startExam = () => {
    setExamStarted(true);
    speak(questions[0].prompt);
  };
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setTranscript("");  // Clear the input when navigating to a previous question
      {speak(questions[currentQuestion].prompt)}
    }
  };

  const skipQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      speak(`Skipping question ${currentQuestion + 1}`)
      speak(questions[currentQuestion + 1].prompt);
    } else {
      setSubmitPrompt(true);
      speak("Are you sure you want to submit the examination? Type 'yes' to confirm.");
    }
    setTranscript("");  // Clear the input when skipping to next question
  };

  const checkAnswer = (answer) => {
    if (!submitPrompt && answer.toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
      setScore(score + 1);
    }

    if (submitPrompt) {
      if (answer.toLowerCase() === "yes") {
        const finalScoreMessage = `Quiz finished! Your score is ${score} out of ${questions.length}.`;
        speak(finalScoreMessage);
        setExamStarted(false); // To reset the exam or navigate to a different screen
      }
      setSubmitPrompt(false);
    } else if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      speak(questions[currentQuestion + 1].prompt);
    } else {
      setSubmitPrompt(true);
      speak("Are you sure you want to submit the examination? Type 'yes' to confirm.");
    }
  };

  const handleSubmit = () => {
    checkAnswer(transcript);
    setTranscript("");  // Clear the input for the next question
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };
  const validateAndSubmit = () => {
    if (transcript.trim() === "") {
      const message = "Please provide an answer to save or skip the question";
      speak(message);
    } else {
      handleSubmit();
    }
  };

  return (
    <>
    
    <div className='main'>
      {!examStarted ? (
        <button className='btn' onClick={startExam}>Start Exam</button>
      ) : (
        <>
          <h1>{questions[currentQuestion].prompt}</h1>
          <div>
            <br />
            <label>
              Your Answer:
              <input
                type="text"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
              />
            </label>
            <br />
            <button className='btn' onClick={handlePrevious} disabled={currentQuestion === 0 || submitPrompt}>
              Previous
            </button>
            <button className='btn' onClick={validateAndSubmit}>
              {submitPrompt ? "Submit Examination" : "Save Answer"}
            </button>
            <button className='btn' onClick={skipQuestion} disabled={submitPrompt}>
              Skip
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}

export default ExamComponent;
