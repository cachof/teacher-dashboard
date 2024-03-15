/*
The QuestionsRow component in React is responsible for rendering a single row in a table,
representing a question. It displays information such as question text, correct answer,
and point value in separate columns. The component receives data for a specific question
and its index.

- QuestionsRow: React functional component for rendering a row in a table representing a question.
  - Parameters:
    - question: Data object representing a specific question.
    - index: Index of the question in the overall list.
  - JSX Elements:
    - Displays a table row with cells for question index, question text, correct answer,
      and point value.
*/

import React from "react";

function QuestionsRow({ question, index }) {
  return (
    <>
      <tr key={question.question_id}>
        <td>{index + 1}</td>
        <td>{question.question_text}</td>
        <td>{question.correct_answer}</td>
        <td>${question.point_value}</td>
      </tr>
    </>
  );
}

export default QuestionsRow;
