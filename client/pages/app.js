import React, { useState } from "react";

const App = () => {
  const [text, setText] = useState("No call yet");

  const getDate = async () => {
    const response = await fetch("/api/hola");
    const data = await response.json();

    setText(`The datetime is: ${data.date} ${data.time}`);
  };

  return (
    <>
      <h1>Hola Mundo CLEAN</h1>
      <button onClick={getDate}>Press me</button>
      <p>{text}</p>
    </>
  );
};

export default App;
