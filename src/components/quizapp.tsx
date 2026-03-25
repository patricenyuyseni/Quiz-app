import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [start, setStart] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["quiz"],
    enabled: start,
    queryFn: async () => {
      const res = await fetch(
        "https://the-trivia-api.com/v2/questions?limit=20",
      );
      const data = await res.json();

      return data.map((question: any) => {
        const options = [...question.incorrectAnswers, question.correctAnswer];
        return {
          question: question.question.text,
          correct: question.correctAnswer,
          options: options.sort(() => Math.random() - 0.5),
        };
      });
    },
  });
  if (!start) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-3xl font-bold mb-6">Welcome to Quiz</h2>
        <button onClick={() => setStart(true)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"  
        >Start Quiz</button>
      </div>
    );
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading quiz</p>;

  function handleAnswer(option: any) {
    if (option === data[currentQuestion].correct) {
      setScore((prev) => prev + 1);
    }

     const next = currentQuestion + 1;
     if (next < data.length) {
       setCurrentQuestion(next);
     } else {
      setShowScore(true);
    }

  }

  if (showScore) {
    
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">
          Score: {score} / {data.length}
        </h2>

        <button
          onClick={() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowScore(false);
            setStart(false);
          }}
        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Restart quiz
        </button>
      </div>
    );
  }

  const question = data[currentQuestion];

  return (
    <div>
        <p>score: {score}</p>
      <h3>
        Question {currentQuestion + 1} / {data.length}
      </h3>

      <p>{question.question}</p>

      {question.options.map((option: any, index: any) => (
        <button key={index} onClick={() => handleAnswer(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
