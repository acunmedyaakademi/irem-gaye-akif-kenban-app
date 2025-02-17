import { useState, useRef, useContext } from "react";
import { DownSvg, PlusSvg, SettingSvg } from "../Svg";
import { DataContext } from "../App";

export default function Board() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeBoard, setActiveBoard] = useState("Platform Launch");
  const dialogRef = useRef(null);
  const data = useContext(DataContext);

  if (!data) return <div>Loading...</div>;

  const boards = data.boards || [];

  const toggleDialog = () => {
    if (!isOpen) {
      dialogRef.current.showModal();
      setIsOpen(true);
    } else {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const handleDialogClick = (e) => {
    // Eğer tıklanan eleman dialog'un kendisiyse (child değilse) kapat.
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const handleBoardClick = (boardName) => {
    setActiveBoard(boardName);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      {/* Header */}
      <header className="header">
        <div className="header-logo">
          <img src="svg/platform-launch-icon.svg" alt="Platform Launch Icon" />
        </div>

        {/* Dropdown butonu */}
        <div className="dropdown">
          <button onClick={toggleDialog} className="dropdown-btn">
            <span>Platform Launch</span>
            <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
              <DownSvg />
            </span>
          </button>

          {/* Dialog menüsü */}
          <dialog
            ref={dialogRef}
            className="dropdown-menu"
            onClick={handleDialogClick}
          >
            <p className="menu-title">All Boards (3)</p>
            <ul>
              <li
                className={activeBoard === "Platform Launch" ? "active" : ""}
                onClick={() => handleBoardClick("Platform Launch")}
              >
                Platform Launch
              </li>
              <li
                className={activeBoard === "Marketing Plan" ? "active" : ""}
                onClick={() => handleBoardClick("Marketing Plan")}
              >
                Marketing Plan
              </li>
              <li
                className={activeBoard === "Roadmap" ? "active" : ""}
                onClick={() => handleBoardClick("Roadmap")}
              >
                Roadmap
              </li>
              <a href="#/new-board" className="new-board">
                + Create New Board
              </a>
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
          </dialog>
        </div>

        <div className="btns-area">
          <a href="#/new-task" className="plus-icon">
            <PlusSvg />
          </a>
          <button className="setting-icon">
            <SettingSvg />
          </button>
        </div>
      </header>
    </div>
  );
}
