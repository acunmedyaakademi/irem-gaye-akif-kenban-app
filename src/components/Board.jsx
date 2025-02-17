import { useState } from "react";
import { DownSvg } from "../Svg";

export default function Board() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src="svg/platform-launch-icon.svg" alt="Platform Launch Icon" />
        </div>

        {/* Dropdown*/}
        <div className="dropdown">
          <button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn">
            <span>Platform Launch</span>
            <DownSvg />
          </button>

          {/* Dropdown Menü */}
          {isOpen && (
            <div className="dropdown-menu">
              <p className="menu-title">All Boards (3)</p>
              <ul>
                <li className="active">Platform Launch</li>
                <li>Marketing Plan</li>
                <li>Roadmap</li>
                <li className="new-board">+ Create New Board</li>
              </ul>

              {/* Dark Mode Toggle */}
              <div className="toggle-container">
                <span className="icon"></span>
                <button
                  className={`toggle-btn ${isDarkMode ? "dark" : "light"}`}
                  onClick={() => setIsDarkMode(!isDarkMode)}
                >
                  <span className="toggle-circle"></span>
                </button>
                <span className="icon"></span>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
