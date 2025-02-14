import type React from "react"
import { X } from "lucide-react"
import "../styles/Modal.css"

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <h2>How to Play</h2>

        <div className="help-content">
          <p>Guess the WORDLE in 6 tries.</p>

          <ul>
            <p>Each guess must be a valid 5-letter word.</p>
            <p>The color of the tiles will change to show how close your guess was to the word.</p>
          </ul>

          <div className="examples">
            <h3>Examples</h3>

            <div className="example">
              <div className="example-tiles">
                <div className="tile correct">W</div>
                <div className="tile">E</div>
                <div className="tile">A</div>
                <div className="tile">R</div>
                <div className="tile">Y</div>
              </div>
              <p>W is in the word and in the correct spot.</p>
            </div>

            <div className="example">
              <div className="example-tiles">
                <div className="tile">P</div>
                <div className="tile present">I</div>
                <div className="tile">L</div>
                <div className="tile">L</div>
                <div className="tile">S</div>
              </div>
              <p>I is in the word but in the wrong spot.</p>
            </div>

            <div className="example">
              <div className="example-tiles">
                <div className="tile">V</div>
                <div className="tile">A</div>
                <div className="tile absent">G</div>
                <div className="tile">U</div>
                <div className="tile">E</div>
              </div>
              <p>G is not in the word in any spot.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpModal

