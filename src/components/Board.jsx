import { useState, useRef, useContext, useEffect } from "react";
import { DownSvg, PlusSvg, SettingSvg, BoardSvg, KanbanSvg } from "../Svg";
import { TaskContext } from "./TaskContext";

export default function Board() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  if (!data) return <div>Loading...</div>;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Data yapısındaki board listesi
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
    // Eğer tıklanan eleman dialog'un kendisiyse dialogu kapat
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const handleBoardClick = (boardName) => {
    setActiveBoard(boardName);
    // Seçim yapıldığında dialogu kapat
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
        <div className="header-logo-area">
          <div className="header-logo">
            <img src="svg/platform-launch-icon.svg" alt="Platform Launch Icon" />
          </div>
          <div className="kanban-logo">
            {isDesktop && <KanbanSvg />}
          </div>
        </div>
        {isDesktop &&
          <div className="side-bar-menu-overlay">

          </div>
        }
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
            onClick={handleDialogClick}>
            <p className="menu-title">All Boards ({boards.length})</p>
            <ul>
              {boards.map((board) => (
                <li
                  key={board.id}
                  className={activeBoard === board.name ? "active" : ""}
                  onClick={() => handleBoardClick(board.name)}>
                  <BoardSvg />
                  {board.name}
                </li>
              ))}
            </ul>
            <a href="#/new-board" className="new-board">
              <BoardSvg />
              + Create New Board
            </a>

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
      <div className="board-content">
        {currentBoard && (

          <div className="board-columns">
            {currentBoard.columns.map((column) => (
              <div key={column.id} className="board-column">
                <h3>{column.name}</h3>
                <div className="tasks">
                  {column.tasks.map((task) => {
                    const activetasks = task.subtasks.filter(x => x.isCompleted).length;
                    console.log(activetasks);
                    return (
                      <div onClick={() => window.location.hash = `/detail/${task.id}`} key={task.id} className="task-card">
                        <h4>{task.title}</h4>
                        <h6>{activetasks} of {task.subtasks.length} subtasks</h6>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
