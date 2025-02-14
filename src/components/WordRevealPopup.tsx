import type React from "react"
import "../styles/WordRevealPopup.css"

interface WordRevealPopupProps {
  word: string
  isCorrect: boolean
  onClose: () => void
}

const WordRevealPopup: React.FC<WordRevealPopupProps> = ({ word, isCorrect, onClose }) => {
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

