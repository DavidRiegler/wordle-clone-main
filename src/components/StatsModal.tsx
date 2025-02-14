import type React from "react"
import { X } from "lucide-react"
import "../styles/Modal.css"

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
  stats: {
    gamesPlayed: number
    gamesWon: number
    currentStreak: number
    maxStreak: number
    guessDistribution: number[]
  }
  onPlayAgain: () => void
}

const StatsModal: React.FC<StatsModalProps> = ({ isOpen, onClose, stats, onPlayAgain }) => {
  if (!isOpen) return null

  const winPercentage = stats.gamesPlayed > 0 ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) : 0

  const maxGuesses = Math.max(...stats.guessDistribution)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <h2>Statistics</h2>

        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">{stats.gamesPlayed}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{winPercentage}</div>
            <div className="stat-label">Win %</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>

        <h3>GUESS DISTRIBUTION</h3>
        <div className="guess-distribution">
          {stats.guessDistribution.map((count, index) => (
            <div key={index} className="guess-row">
              <div className="guess-number">{index + 1}</div>
              <div
                className="guess-bar"
                style={{
                  width: `${maxGuesses > 0 ? (count / maxGuesses) * 100 : 0}%`,
                  backgroundColor: "#3a3a3c",
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>

        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  )
}

export default StatsModal

