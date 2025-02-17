import { useState, useRef, useContext } from "react";
import { DownSvg, PlusSvg, SettingSvg } from "../Svg";
import { DataContext } from "../App"; // DataContext'i içe aktarın

export default function Board() {
  // Data'yı context'ten alıyoruz
  const data = useContext(DataContext);
  // Eğer data henüz yüklenmediyse, yükleniyor mesajı veya boş bir render yapabilirsiniz
  if (!data) return <div>Loading...</div>;

  // Data yapısındaki board listesini alıyoruz
  const boards = data.boards || [];

  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeBoard, setActiveBoard] = useState("Platform Launch");
  const dialogRef = useRef(null);

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
    // Eğer tıklanan eleman dialog'un kendisiyse, dialog'u kapat
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const handleBoardClick = (boardName) => {
    setActiveBoard(boardName);
    // Seçim yapıldığında dialog'u kapatalım
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  // Seçilen boardun verisini alıyoruz
  const currentBoard = boards.find((board) => board.name === activeBoard);

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
            <span>{activeBoard}</span>
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
            <p className="menu-title">All Boards ({boards.length})</p>
            <ul>
              {boards.map((board) => (
                <li
                  key={board.id}
                  className={activeBoard === board.name ? "active" : ""}
                  onClick={() => handleBoardClick(board.name)}
                >
                  {board.name}
                </li>
              ))}
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

      {/* Board İçeriği: Seçilen boarda ait sütunlar ve task'lar */}
      {currentBoard && (
        <div className="board-columns">
          {currentBoard.columns.map((column) => (
            <div key={column.id} className="board-column">
              <h3>{column.name}</h3>
              <div className="tasks">
                {column.tasks.map((task) => (
                  <div key={task.id} className="task-card">
                    <h4>{task.title}</h4>
                    <h6>0 of {task.subtasks.length} subtasks</h6>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
