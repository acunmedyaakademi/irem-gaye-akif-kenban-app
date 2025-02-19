import { useState, useRef, useContext, useEffect } from "react";
import { DownSvg, PlusSvg, SettingSvg, BoardSvg, HideSidebarSvg, EyeSvg } from "../Svg";
import { TaskContext } from "./TaskContext";
import DropdownMenu from "./DropDownMenu";
import DeleteDialog from "./DeleteDialog";
import EditBoardDialog from "./EditBoardDialog";
import NewColumn from "./NewColumn"; 
import Detail from "./Detail"; // Detail bileşenini dahil ettik
import NewTask from "./NewTask"; // Yeni görev bileşenini dahil ettik
import { useTheme } from "./ThemeContext"; // Theme context import edildi
import "/style/lightMode.css";


export default function Board() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false); // Detail Modal durumu
  const [isNewTaskDialogOpen, setIsNewTaskDialogOpen] = useState(false); // New Task Dialog durumu
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isColumnDialogOpen,setIsColumnDialogOpen] = useState(false)
  const { theme, toggleTheme } = useTheme(); // Tema durumu

  if (!data) return <div>Loading...</div>;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const currentBoard = boards.find((board) => board.name === activeBoard) || { columns: [] };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onEdit = () => {
    setEdit(true);
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


  // Task detail dialogunu açma fonksiyonu
  const openDetailDialog = (task) => {
    setCurrentTask(task);
    setIsDetailDialogOpen(true);
  };

  // Yeni görev dialogunu açma fonksiyonu
  const openNewTaskDialog = () => {
    setIsNewTaskDialogOpen(true);
  };

  const openAddColumnDialog = () => {
    setIsColumnDialogOpen(true);
  }
const addNewColumnToBoard = (newColumn) => {
  const updatedBoards = data.boards.map((board) => {
    if (board.name === activeBoard) {
      return { ...board, columns: [...board.columns, newColumn] };
    }
    return board;
  });

  setData({ ...data, boards: updatedBoards });

};


  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <header className="header">
        <div className="header-logo-area">
          <div className="header-logo">
            <img src="svg/platform-launch-icon.svg" alt="Platform Launch Icon" />
          </div>
          <div className="kanban-logo">
            {isDesktop && (
              theme === "light"
                ? <img src="svg/dark-kanban.svg" alt="" />
                : <img src="svg/light-kanban.svg" alt="" />
            )}
          </div>
          <div className="active-board-name">
            <h3>{isDesktop && activeBoard}</h3>
          </div>
        </div>

        {!isSidebarOpen && ( // Sidebar kapalıyken butonu göster
          <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
            <span className="open-sidebar"><EyeSvg /></span>
          </button>
        )}

        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <div className="dropdown">
            <button onClick={toggleDialog} className="dropdown-btn">
              <span>{activeBoard}</span>
              <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
                <DownSvg />
              </span>
            </button>

            <dialog ref={dialogRef} className="dropdown-menu" onClick={handleDialogClick}>
              <p className="menu-title">All Boards ({boards.length})</p>
              <ul>
                {boards.map((board) => (
                  <li key={board.id} className={activeBoard === board.name ? "active" : ""} onClick={() => handleBoardClick(board.name)}>
                    <BoardSvg />
                    {board.name}
                  </li>
                ))}
              </ul>
              <div className="new-board">
                <a href="#/new-board">
                  <BoardSvg />
                  <span>+ Create New Board</span>
                </a>
              </div>
              {isDesktop ?
                <>
                  <div className="sidebar-footer">
                    <label className="theme-switch">
                      <img src="/svg/moon-icon-kanban.svg" alt="Moon Icon" />
                      <input
                        className="switch"
                        type="checkbox"
                        defaultChecked={theme === "light"}
                        onChange={toggleTheme}
                      />
                      <img src="/svg/sun-icon-kanban.svg" alt="Sun Icon" />
                    </label>
                    <button className="hide-sidebar" onClick={toggleSidebar}>
                      <HideSidebarSvg />
                      <span>Hide Sidebar</span>
                    </button>
                  </div>
                </>
                :
                <>
                  <label className="theme-switch">
                    <img src="/svg/moon-icon-kanban.svg" alt="Moon Icon" />
                    <input
                      className="switch"
                      type="checkbox"
                      defaultChecked={theme === "light"}
                      onChange={toggleTheme}
                    />
                    <img src="/svg/sun-icon-kanban.svg" alt="Sun Icon" />
                  </label>
                </>
              }

            </dialog>
          </div>
        </div>


        <div className="btns-area">
          <button
            className="plus-icon"
            onClick={() => {
              setCurrentTask(null);
              setEdit(false);
              setIsNewTaskDialogOpen(true);
            }}
          >
            <PlusSvg />
            {isDesktop && <span>Add New Task</span>}
          </button>

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

      <div className={`board-content ${isSidebarOpen ? "with-sidebar" : ""}`}>
        {currentBoard && currentBoard.columns && currentBoard.columns.length > 0 ? (
          <>
          <div key={currentBoard.id} className="board-columns">
            {currentBoard.columns.map((column) => (
              <div key={column.id} className="board-column">
                
                <h3 className="sda"><span className="asd"></span>{column.name}({column.tasks.length})</h3>
                <div className="tasks">
                  
                  {column.tasks.map((task) => {
                    const activetasks = task.subtasks.filter((x) => x.isCompleted).length;
                    return (
                      <div key={task.id} className="task-card" onClick={() => openDetailDialog(task)}>
                        <h4>{task.title}</h4>
                        <h6>
                          {activetasks} of {task.subtasks.length} subtasks
                        </h6>
                      </div>
                    );
                  })}       
                </div>
              </div>
            ))}
            <button onClick={openAddColumnDialog} className="new-column">NewColumn</button>
          </div>
          </>
        ) : (
          <div className="empty-board-message">No columns available</div>
        )}
      </div>

      {isNewTaskDialogOpen && (
        <div className="new-task-modal-overlay" onClick={() => setIsNewTaskDialogOpen(false)}>
          <div className="new-task-modal" onClick={(e) => e.stopPropagation()}>
            <NewTask onClose={() => setIsNewTaskDialogOpen(false)} />
          </div>
        </div>
      )}

      {isDetailDialogOpen && (
        <div className="detail-modal-overlay" onClick={() => setIsDetailDialogOpen(false)}>
          <div className="detail-modal" onClick={(e) => e.stopPropagation()}>
            <Detail onClose={() => setIsDetailDialogOpen(false)} openNewTaskDialog={openNewTaskDialog} setIsDetailDialogOpen={setIsDetailDialogOpen} />
          </div>
        </div>
      )}

      {isColumnDialogOpen && (
        <div className="new-task-modal-overlay" onClick={() => setIsColumnDialogOpen(false)}>
          <div className="new-task-modal" onClick={(e) => e.stopPropagation()}>
            <NewColumn onClose={() => setIsColumnDialogOpen(false)} addNewColumnToBoard={addNewColumnToBoard} />
          </div>
        </div>
      )}

    </div>
  );
}
