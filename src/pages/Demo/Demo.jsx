import React, { useState, useEffect } from "react";
import Header from "../../components/common/header/Header";

function Demo() {
  const [questions, setQuestions] = useState(null);
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_questions");
        if (response.ok) {
          const data = await response.json();
          setQuestions(data.message);
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchQuestions();
  }, []);

  return (
    <>
    <Header/>
    <div>
      <h1>Questions</h1>
      {questions && (
        <div>
          <p>Message received from the Flask API:</p>
          <pre>{JSON.stringify(questions, null, 1)}</pre>
        </div>
      )}
    </div>
    </>
  );
}

export default Demo;
