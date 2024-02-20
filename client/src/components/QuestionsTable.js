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
