import { useState, useRef, useContext, useEffect } from "react";
import { DownSvg, PlusSvg, SettingSvg, BoardSvg, KanbanSvg, HideSidebarSvg, EyeSvg } from "../Svg";
import { TaskContext } from "./TaskContext";
import DropdownMenu from "./DropDownMenu";
import DeleteDialog from "./DeleteDialog";
import EditBoardDialog from "./EditBoardDialog";

export default function Board() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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

  // Board listesi
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const onConfirm = () => {
    const updatedBoards = data.boards.filter((board) => board.name !== activeBoard);
    setData({ ...data, boards: updatedBoards });
    setActiveBoard(updatedBoards.length > 0 ? updatedBoards[0].name : "Platform Launch");
    setIsDeleteDialogOpen(false);
  };

  const onCancel = () => {
    setIsDeleteDialogOpen(false);
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
          {isSidebarOpen ? (
            <>
              <HideSidebarSvg />
              <span>Hide Sidebar</span>
            </>
          ) : (
            <div className="open-sidebar">
              <EyeSvg />
            </div>
          )}
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

          <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="setting-icon">
            <SettingSvg />
          </div>

          {isDropdownOpen && (
            <div className="task-dropdown">
              <button className="task-dropdown-item" onClick={() => setIsEditDialogOpen(true)}>
                Edit Board
              </button>

              <button className="task-dropdown-item delete" onClick={onDelete}>
                Delete Board
              </button>
            </div>
          )}

          {isDeleteDialogOpen && (
            <div className="dialog-overlay">
              <div className="delete-dialog">
                <h3>Delete this board?</h3>
                <p>Are you sure you want to delete the board? This action cannot be undone.</p>
                <div className="delete-dialog-actions">
                  <button className="delete-dialog-delete" onClick={onConfirm}>
                    Delete
                  </button>
                  <button className="delete-dialog-cancel" onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <EditBoardDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        activeBoard={activeBoard}
        setActiveBoard={setActiveBoard}
        data={data}
        setData={setData}
      />

      {/* Board İçeriği */}
      <div className={`board-content ${isSidebarOpen ? "with-sidebar" : ""}`}>
        {currentBoard && currentBoard.columns && currentBoard.columns.length > 0 ? (
          <div key={currentBoard.id} className="board-columns">
            {currentBoard.columns.map((column) => (
              <div key={column.id} className="board-column">
                <h3>{column.name}</h3>
                <div className="tasks">
                  {column.tasks && column.tasks.length > 0 ? (
                    column.tasks.map((task) => {
                      const activetasks = task.subtasks.filter(x => x.isCompleted).length;
                      return (
                        <div
                          onClick={() => (window.location.hash = `/detail/${task.id}`)}
                          key={task.id}
                          className="task-card"
                        >
                          <h4>{task.title}</h4>
                          <h6>
                            {activetasks} of {task.subtasks.length} subtasks
                          </h6>
                        </div>
                      );
                    })
                  ) : (
                    <p>No tasks available</p>
                  )}
                </div>
              </div>
            ))}
            <div>
              <a href="#/new-column">
                <button>New Column</button>
              </a>
            </div>
          </div>
        ) : (
    <p>No columns </p>
  )}
</div>

    </div>
  );
}
