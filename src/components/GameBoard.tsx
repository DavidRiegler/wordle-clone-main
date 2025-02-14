import type React from "react"
import "../styles/GameBoard.css"

interface GameBoardProps {
  guesses: string[]
  currentGuess: string
  secretWord: string
}

interface LetterCount {
  [key: string]: number
}

interface ExactMatches {
  [key: number]: boolean
}

const GameBoard: React.FC<GameBoardProps> = ({ guesses, currentGuess, secretWord }) => {
  const rows = Array(6).fill("")

  // Fill in the guesses
  guesses.forEach((guess, i) => {
    rows[i] = guess
  })

  // Add the current guess
  if (guesses.length < 6) {
    rows[guesses.length] = currentGuess
  }

  const getLetterStatus = (letter: string, index: number, word: string) => {
    if (!secretWord || !letter) return ""

    // Count remaining occurrences of the letter after marking exact matches
    const letterCount: LetterCount = {}
    const exactMatches: ExactMatches = {}

    // First pass: Mark exact matches
    for (let i = 0; i < secretWord.length; i++) {
      letterCount[secretWord[i]] = (letterCount[secretWord[i]] || 0) + 1
      if (word[i] === secretWord[i]) {
        exactMatches[i] = true
        letterCount[secretWord[i]]--
      }
    }

    // Second pass: Check current letter
    if (exactMatches[index]) return "correct"

    if (secretWord.includes(letter)) {
      // Count previous occurrences of this letter
      let previousOccurrences = 0
      for (let i = 0; i < index; i++) {
        if (word[i] === letter && !exactMatches[i]) {
          previousOccurrences++
        }
      }

      // If we haven't exceeded the count of remaining letters, mark as present
      if (previousOccurrences < (letterCount[letter] || 0)) {
        return "present"
      }
    }

    return "absent"
  }

  return (
    <div className="game-board">
      {rows.map((word, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array(5)
            .fill("")
            .map((_, colIndex) => {
              const letter = word[colIndex] || ""
              const status = word === currentGuess ? "" : letter ? getLetterStatus(letter, colIndex, word) : ""

              return (
                <div key={colIndex} className={`tile ${status} ${letter ? "filled" : ""}`}>
                  {letter}
                </div>
              )
            })}
        </div>
      ))}
    </div>
  )
}

export default GameBoard

