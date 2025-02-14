"use client"
import { useState, useEffect } from "react"
import GameBoard from "./components/GameBoard"
import Keyboard from "./components/Keyboard"
import Header from "./components/Header"
import StatsModal from "./components/StatsModal"
import HelpModal from "./components/HelpModal"
import SettingsModal from "./components/SettingsModal"
import WordRevealPopup from "./components/WordRevealPopup"
import { checkWord } from "./utils/wordUtils"
import "./App.css"

interface GameStats {
  gamesPlayed: number
  gamesWon: number
  currentStreak: number
  maxStreak: number
  guessDistribution: number[]
}

const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

const initialStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: Array(6).fill(0),
}

const generateRandomWord = async (): Promise<string> => {
  try {
    let validWord = false;
    let randomWord = "";

    while (!validWord) {
      // Fetch a list of English words
      const response = await fetch("https://random-word-api.herokuapp.com/word?number=1&length=5");
      const words = await response.json();

      if (!words || words.length === 0) {
        throw new Error("Failed to fetch words");
      }

      randomWord = words[0].toUpperCase();

      // Check if the generated word exists in the dictionary
      const dictionaryResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord.toLowerCase()}`);
      validWord = dictionaryResponse.ok; // If the response is OK, the word is valid
    }

    return randomWord;
  } catch (error) {
    console.error("Error fetching words:", error);
    return "ERROR"; // Handle error appropriately
  }
};

function App() {
  const [secretWord, setSecretWord] = useState("")
  const [guesses, setGuesses] = useState<string[]>([])
  const [currentGuess, setCurrentGuess] = useState("")
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState("")
  const [stats, setStats] = useState<GameStats>(initialStats)
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [showWordReveal, setShowWordReveal] = useState(false)
  const [isCorrectGuess, setIsCorrectGuess] = useState(false)

  useEffect(() => {
    const savedStats = localStorage.getItem("wordleStats")
    if (savedStats) {
      setStats(JSON.parse(savedStats))
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark")
    }

    generateRandomWord().then(setSecretWord)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const updateStats = (won: boolean, numGuesses: number) => {
    const newStats = { ...stats }
    newStats.gamesPlayed++

    if (won) {
      newStats.gamesWon++
      newStats.currentStreak++
      newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
      newStats.guessDistribution[numGuesses - 1]++
    } else {
      newStats.currentStreak = 0
    }

    setStats(newStats)
    localStorage.setItem("wordleStats", JSON.stringify(newStats))
  }

  const handleSubmit = async () => {
    if (currentGuess.length !== WORD_LENGTH) {
      showMessage("Word must be 5 letters")
      return
    }

    const isValid = await checkWord(currentGuess.toLowerCase())
    if (!isValid) {
      showMessage("Not in word list")
      return
    }

    const newGuesses = [...guesses, currentGuess]
    setGuesses(newGuesses)
    setCurrentGuess("")

    if (currentGuess === secretWord) {
      setGameOver(true)
      setIsCorrectGuess(true)
      updateStats(true, newGuesses.length)
      setShowWordReveal(true)
    } else if (newGuesses.length === MAX_ATTEMPTS) {
      setGameOver(true)
      setIsCorrectGuess(false)
      updateStats(false, MAX_ATTEMPTS)
      setShowWordReveal(true)
    }
  }

  const showMessage = (msg: string) => {
    setMessage(msg)
    setTimeout(() => setMessage(""), 2000)
  }

  const handleKeyPress = (key: string) => {
    if (gameOver) return

    if (key === "ENTER") {
      handleSubmit()
    } else if (key === "BACKSPACE") {
      setCurrentGuess((prev) => prev.slice(0, -1))
    } else if (currentGuess.length < WORD_LENGTH && /^[A-Z]$/.test(key)) {
      setCurrentGuess((prev) => prev + key)
    }
  }

  const startNewGame = () => {
    generateRandomWord().then(setSecretWord)
    setGuesses([])
    setCurrentGuess("")
    setGameOver(false)
    setMessage("")
    setShowStats(false)
    setShowWordReveal(false)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (gameOver) return

      if (event.key === "Enter") {
        handleSubmit()
      } else if (event.key === "Backspace") {
        setCurrentGuess((prev) => prev.slice(0, -1))
      } else if (currentGuess.length < WORD_LENGTH && /^[a-zA-Z]$/.test(event.key)) {
        setCurrentGuess((prev) => prev + event.key.toUpperCase())
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentGuess, gameOver]) // Removed handleSubmit from dependency array

  return (
    <div className={`App ${isDarkMode ? "dark" : ""}`}>
      <Header
        onStatsClick={() => setShowStats(true)}
        onHelpClick={() => setShowHelp(true)}
        onSettingsClick={() => setShowSettings(true)}
      />
      {message && <div className="message">{message}</div>}
      <GameBoard guesses={guesses} currentGuess={currentGuess} secretWord={secretWord} />
      <Keyboard onKeyPress={handleKeyPress} guesses={guesses} secretWord={secretWord} />

      {showWordReveal && (
        <WordRevealPopup
          word={secretWord}
          isCorrect={isCorrectGuess}
          onClose={() => {
            setShowWordReveal(false)
            setShowStats(true)
          }}
        />
      )}

      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} stats={stats} onPlayAgain={startNewGame} />

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        isDarkMode={isDarkMode}
        onThemeChange={(dark) => {
          setIsDarkMode(dark)
          localStorage.setItem("theme", dark ? "dark" : "light")
        }}
      />
    </div>
  )
}

export default App

