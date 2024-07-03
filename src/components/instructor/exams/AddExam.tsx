import React, { useState } from "react";

export const AddExam: React.FC = () => {
  const [questions, setQuestions] = useState(Array(5).fill({ question: "", options: ["", "", "", ""] }));

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = { ...newQuestions[index], question: value };
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  return (
    <div className="max-w-7xl mx-auto p-6  shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6">Add Exam</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="select-course" className="label">
            <span className="label-text">Select Course</span>
          </label>
          <select className="select select-primary w-full bg-gray-100 dark:bg-gray-900">
            <option disabled selected>Choose a course</option>
            <option>Course 1</option>
            <option>Course 2</option>
            <option>Course 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="exam-name" className="label">
            <span className="label-text">Exam Name</span>
          </label>
          <input
            type="text"
            placeholder="Enter exam name"
            className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
          />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Questions</h3>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="collapse collapse-arrow dark:bg-gray-950 mb-4">
            <input type="checkbox" name={`question-${qIndex}`} defaultChecked={qIndex === 0} />
            <div className="collapse-title text-xl font-medium">
              Question {qIndex + 1}
            </div>
            <div className="collapse-content">
              <textarea
                className="textarea textarea-primary w-full mb-4 bg-gray-100 dark:bg-gray-900"
                placeholder="Enter your question here"
                value={q.question}
                onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option: any, oIndex: any) => (
                  <div key={oIndex}>
                    <label className="label">
                      <span className="label-text">Option {oIndex + 1}</span>
                    </label>
                    <input
                      type="text"
                      className="input input-bordered input-primary w-full bg-gray-100 dark:bg-gray-900"
                      placeholder={`Enter option ${oIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="btn btn-primary">
          Save Exam
        </button>
      </div>
    </div>
  );
};