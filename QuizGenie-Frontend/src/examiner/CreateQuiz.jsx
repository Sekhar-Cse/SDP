import React, { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([
    { questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" },
  ]);

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][event.target.name] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" },
    ]);
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const examinerUsername = sessionStorage.getItem('examinerUsername');

    try {
      const sectionResponse = await axios.get(`http://localhost:2097/section/by-examiner?username=${examinerUsername}`);
      const section = sectionResponse.data;

      const quizData = {
        quizTitle: quizTitle,
        sectionName: section.sectionName,  // only the name, not full object
        examinerUsername: examinerUsername,
        questions: questions
      };

      

      const response = await axios.post("http://localhost:2097/examiner/createquiz", quizData);
      console.log(response.data);
      alert("Quiz Created Successfully!");
      setQuizTitle("");
      setQuestions([{ questionText: "", optionA: "", optionB: "", optionC: "", optionD: "", correctAnswer: "" }]);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-white shadow-lg rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Create New Quiz</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
          required
        />

        {questions.map((q, index) => (
          <div key={index} className="p-6 border rounded-xl bg-gray-50 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Question {index + 1}</h3>

            <input
              type="text"
              name="questionText"
              placeholder="Question Text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, e)}
              className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="optionA"
                placeholder="Option A"
                value={q.optionA}
                onChange={(e) => handleQuestionChange(index, e)}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                required
              />
              <input
                type="text"
                name="optionB"
                placeholder="Option B"
                value={q.optionB}
                onChange={(e) => handleQuestionChange(index, e)}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                required
              />
              <input
                type="text"
                name="optionC"
                placeholder="Option C"
                value={q.optionC}
                onChange={(e) => handleQuestionChange(index, e)}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                required
              />
              <input
                type="text"
                name="optionD"
                placeholder="Option D"
                value={q.optionD}
                onChange={(e) => handleQuestionChange(index, e)}
                className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                required
              />
            </div>

            <input
              type="text"
              name="correctAnswer"
              placeholder="Correct Answer (A/B/C/D)"
              value={q.correctAnswer}
              onChange={(e) => handleQuestionChange(index, e)}
              className="w-full p-3 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 cursor-pointer"
              required
            />

            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md cursor-pointer"
            >
              Remove Question
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={addQuestion}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl cursor-pointer"
          >
            Add Another Question
          </button>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl cursor-pointer"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateQuiz;
