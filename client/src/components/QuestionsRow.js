import React from "react";

function QuestionsRow({ question, index}) {
  return (
    <>
    <tr key = {question.question_id}>
        <td>{index + 1}</td>
        <td>{question.question_text}</td>
        <td>{question.correct_answer}</td>
        <td>${question.point_value}</td>
    </tr>
    </>
  )
}

export default QuestionsRow;
