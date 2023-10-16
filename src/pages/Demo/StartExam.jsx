import React, { useState, useEffect } from "react";
import Header from "../../components/common/header/Header";

function StartExam() {
  const [commands, setCommands] = useState(null);

  useEffect(() => {
    async function fetchCommands() {
      try {
        const response = await fetch("http://127.0.0.1:5000/start_exam");
        if (response.ok) {
          const data = await response.json();
          setCommands(data.message);
        } else {
          console.error("Failed to fetch questions.");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }

    fetchCommands();
  }, []);

  return (
    <>
    <Header/>
    <div>
      <h1>Questions</h1>
      {commands && (
        <div>
          <p>Message received from the Flask API:</p>
          {JSON.stringify(commands, null, 2)}
        </div>
      )}
    </div>
    </>
  );
}

export default StartExam;
