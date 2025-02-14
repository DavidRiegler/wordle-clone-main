import type React from "react"
import { BarChart2, HelpCircle, Settings } from "lucide-react"
import "../styles/Header.css"

interface HeaderProps {
  onStatsClick: () => void
  onHelpClick: () => void
  onSettingsClick: () => void
}

const Header: React.FC<HeaderProps> = ({ onStatsClick, onHelpClick, onSettingsClick }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1>Wordle</h1>
        <div className="header-icons">
          <button onClick={onStatsClick} aria-label="Statistics">
            <BarChart2 />
          </button>
          <button onClick={onHelpClick} aria-label="How to play">
            <HelpCircle />
          </button>
          <button onClick={onSettingsClick} aria-label="Settings">
            <Settings />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

