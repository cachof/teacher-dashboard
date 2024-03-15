/*
The QuestionsTable component in React is responsible for rendering a table that displays
a list of questions. It utilizes the QuestionsRow component to represent each question
as a row in the table. The table includes columns for question index, question text,
correct answer, and point value.

- QuestionsTable: React functional component for rendering a table of questions.
  - Parameters:
    - questions: Array of question objects containing data for each question.
  - JSX Elements:
    - Displays a table with headers for question index, question text, correct answer,
      and point value.
    - Maps over the provided array of questions and renders each question using the
      QuestionsRow component.
*/

import React from "react";
import QuestionsRow from "./QuestionsRow";

function QuestionsTable({ questions }) {
  return (
    <>
      <table className="table mx-5 text-center">
        <thead className="thead-light">
          <tr>
            <th></th>
            <th>Question</th>
            <th>Answer</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => (
            <QuestionsRow question={question} index={index} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default QuestionsTable;
