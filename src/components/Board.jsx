import { useState, useRef, useContext, useEffect } from "react";
import { DownSvg, PlusSvg, SettingSvg, BoardSvg, KanbanSvg, HideSidebarSvg, EyeSvg } from "../Svg";
import { TaskContext } from "./TaskContext";

export default function Board() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state'i

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
    if (e.target === dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const handleBoardClick = (boardName) => {
    setActiveBoard(boardName);
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsOpen(false);
    }
  };

  const currentBoard = boards.find((board) => board.name === activeBoard);

  // Sidebar toggle fonksiyonu
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

        {/* Sidebar Toggle Button */}
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isSidebarOpen ?( <><HideSidebarSvg  /><span>Hide Sidebar</span>
          </>) : (<div className="open-sidebar">
            <EyeSvg  /> 
          </div>) }
        </button>

        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          {/* Sidebar İçeriği */}
          <div className="dropdown">
            <button onClick={toggleDialog} className="dropdown-btn">
              <span>{activeBoard}</span>
              <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
                <DownSvg />
              </span>
            </button>

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

      {/* Board İçeriği */}
      <div className={`board-content ${isSidebarOpen ? "with-sidebar" : ""}`}>
        {currentBoard && (
          <div className="board-columns">
            {currentBoard.columns.map((column) => (
              <div key={column.id} className="board-column">
                <h3>{column.name}</h3>
                <div className="tasks">
                  {column.tasks.map((task) => {
                    const activetasks = task.subtasks.filter(x => x.isCompleted).length;
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
            <div>
              <a href="#/new-column"><button>New Column</button></a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
