import type React from "react"
import "../styles/Keyboard.css"

interface KeyboardProps {
  onKeyPress: (key: string) => void
  guesses: string[]
  secretWord: string
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, guesses, secretWord }) => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
  ]

  const getKeyStatus = (key: string) => {
    if (!secretWord) return ""

    let status = ""
    const keyUpper = key.toUpperCase()

    for (const guess of guesses) {
      for (let i = 0; i < guess.length; i++) {
        if (guess[i] !== keyUpper) continue

        if (secretWord[i] === keyUpper) {
          return "correct"
        } else if (secretWord.includes(keyUpper)) {
          status = "present"
        } else {
          status = status || "absent"
        }
      }
    }

    return status
  }

  return (
    <div className="keyboard">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((key) => (
            <button key={key} className={`key ${getKeyStatus(key)}`} onClick={() => onKeyPress(key)}>
              {key === "BACKSPACE" ? "⌫" : key}
            </button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Keyboard

