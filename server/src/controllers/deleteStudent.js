const pool = require("../../db");

async function deleteStudentController(req, res) {
try {
  const { id } = req.params;
  const deleteStudent = await pool.query(
    "DELETE FROM students where student_id = $1",
    [id]
  );
  res.status(200);
  res.json({ message: "Student was deleted" });
} catch (error) {
  console.error(error.message);
}
}

module.exports = { deleteStudentController };
