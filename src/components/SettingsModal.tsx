import type React from "react"
import { X } from "lucide-react"
import "../styles/Modal.css"
import "../styles/SettingsModal.css"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  isDarkMode: boolean
  onThemeChange: (dark: boolean) => void
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, isDarkMode, onThemeChange }) => {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content settings-modal">
        <button className="modal-close" onClick={onClose}>
          <X />
        </button>

        <h2>Settings</h2>

        <div className="settings-content">
          <div className="setting-item">
            <div className="setting-info">
              <h3>Dark Theme</h3>
              <p>Toggle between light and dark themes</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={isDarkMode} onChange={(e) => onThemeChange(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal

