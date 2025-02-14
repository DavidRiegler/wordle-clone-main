import React, { useEffect } from "react"
import "../styles/WordRevealPopup.css"

interface WordRevealPopupProps {
  word: string
  isCorrect: boolean
  onClose: () => void
}

const WordRevealPopup: React.FC<WordRevealPopupProps> = ({ word, isCorrect, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <div className="word-reveal-overlay" onClick={onClose}>
      <div className="word-reveal-popup" onClick={(e) => e.stopPropagation()}>
        <p>{isCorrect ? `Congratulations, the correct word was "${word}"` : `The correct word was "${word}"`}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  )
}

export default WordRevealPopup
