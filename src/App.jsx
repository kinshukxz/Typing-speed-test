import React, { useState } from "react";
import randomSentence from "random-sentence";
import TypingBox from "./components/TypingBox";
import Stats from "./components/Stats";

const App = () => {
  const [text, setText] = useState(randomSentence({ min: 6, max: 12 }));
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [theme, setTheme] = useState("dark");

  const handleInputChange = (value) => {
    if (!startTime) setStartTime(Date.now());
    if (value === text) {
      const time = (Date.now() - startTime) / 1000 / 60;
      const calculatedWpm = Math.round(text.split(" ").length / time);
      const correct = value.split("").filter((c, i) => c === text[i]).length;
      const calculatedAccuracy = Math.round((correct / text.length) * 100);
      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
      setFinished(true);
      saveScore(calculatedWpm, calculatedAccuracy);
    }
    setInput(value);
  };

  const saveScore = (wpm, accuracy) => {
    const initials = prompt("Enter your initials:");
    if (!initials) return;
    const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
    scores.push({ initials, wpm, accuracy });
    scores.sort((a, b) => b.wpm - a.wpm);
    localStorage.setItem("leaderboard", JSON.stringify(scores.slice(0, 5)));
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.body.classList.toggle("bg-white");
    document.body.classList.toggle("text-black");
    document.body.classList.toggle("bg-gray-900");
    document.body.classList.toggle("text-white");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* 🌐 Header */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-xl sm:text-2xl font-bold">⚡ Typing Speed Test</h1>
        <button
          onClick={toggleTheme}
          className="bg-yellow-400 text-black px-4 py-1 rounded-full border border-blue-500 shadow hover:bg-yellow-300"
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </header>

      {/* 🎮 Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <TypingBox
          text={text}
          input={input}
          onChange={handleInputChange}
          disabled={finished}
        />
        {finished && (
          <>
            <Stats wpm={wpm} accuracy={accuracy} />
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              🔄 Refresh
            </button>
          </>
        )}
        <Leaderboard />
      </main>

      {/* 🦶 Footer */}
      <footer className="w-full text-center py-3 text-sm border-t border-gray-700">
        Built by <strong>Kinshuk</strong> 💻 
      </footer>
    </div>
  );
};

const Leaderboard = () => {
  const scores = JSON.parse(localStorage.getItem("leaderboard") || "[]");
  return (
    <div className="mt-8 w-full max-w-md bg-gray-800 rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold mb-2 text-yellow-300">
        🏆 Leaderboard
      </h2>
      <ul className="space-y-1 text-left text-white">
        {scores.map((s, i) => (
          <li key={i}>
            {s.initials.toUpperCase()} – {s.wpm} WPM – {s.accuracy}% Accuracy
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
