import { useContext, useState } from "react";
import { SettingSvg, DownSvg } from "../Svg";
import { TaskContext } from "./TaskContext";
import DeleteDialog from "./DeleteDialog";

export default function Detail({ onClose, openNewTaskDialog, setIsDetailDialogOpen }) {
  const { currentTask, setEdit, setCurrentTask, data, setData } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);

  // Taskın bulunduğu boardu buluyoruz
  const currentBoard = data.boards.find(board =>
    board.columns.some(column => column.tasks.some(task => task.id === currentTask.id))
  );

  // Bu boarddaki columnları dinamik olarak alıyoruz
  const statuses = currentBoard ? currentBoard.columns.map(column => column.name) : [];

  if (!currentTask) {
    return <div>Loading...</div>;
  }

  const toggleDropdown = () => {
    setIsTaskDropdownOpen(prevState => !prevState);
  };

  function handleEditDialog() {
    setEdit(true);
    setCurrentTask(currentTask);
    setIsDetailDialogOpen(false); // Detail modalını kapatıyoruz
    openNewTaskDialog(); // NewTask modalını açıyoruz
  }

  function handleDelete() {
    setIsOpen(false);
    setIsDialogOpen(true);
  }

  function confirmDelete() {
    if (!currentTask) return;

    const taskId = currentTask.id;
    const updatedData = { ...data };

    for (let board of updatedData.boards) {
      for (let column of board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1);
          setData(updatedData);
          setCurrentTask(null);
          setIsDialogOpen(false);
          onClose(); // Modalı kapat
          return;
        }
      }
    }
  }

  function cancelDelete() {
    setIsDialogOpen(false);
  }

  const handleStatusChange = (status) => {
    const updatedData = { ...data };
    let found = false;

    // Taskı uygun sütuna taşımak
    for (let board of updatedData.boards) {
      for (let column of board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === currentTask.id);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1); // Taskı çıkarıyoruz
          found = true;
          break;
        }
      }
      if (found) break;
    }

    // Taskı yeni sütuna eklemek
    for (let board of updatedData.boards) {
      for (let column of board.columns) {
        if (column.name.toLowerCase() === status.toLowerCase()) {
          column.tasks.push(currentTask);
          break;
        }
      }
    }

    currentTask.status = status; // Taskın statusünü güncelliyoruz
    setData(updatedData);
  };

  return (
    <div className="detail-container">
      <div className="title-setting-section relative">
        <h1>{currentTask.title}</h1>

        <div className="dropdown-wrapper relative">
          <button onClick={toggleDropdown} className="setting-icon">
            <SettingSvg />
          </button>

          {isTaskDropdownOpen && (
            <div className="task-dropdown">
              <button className="task-dropdown-item" onClick={handleEditDialog}>
                Edit Task
              </button>
              <button className="task-dropdown-item delete" onClick={handleDelete}>
                Delete Task
              </button>
            </div>
          )}
        </div>

        {isDialogOpen && <DeleteDialog onConfirm={confirmDelete} onCancel={cancelDelete} />}
      </div>

      <p>{currentTask.description || "No description"}</p>

      <h2>
        Subtasks ({currentTask.subtasks.filter((subtask) => subtask.isCompleted).length} of{" "}
        {currentTask.subtasks.length})
      </h2>
      <ul className="detail-checkbox-completed">
        {currentTask.subtasks.map((subtask, index) => (
          <div key={index} className="detail-checkbox">
            <input onChange={() => handleCheckboxChange(index)}  type="checkbox" checked={subtask.isCompleted} />
            <li>{subtask.title}</li>
          </div>
        ))}
      </ul>

      <div className="newtask-status-section">
        <h4>Current Status</h4>
        <div className="dropdown">
          <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
            {currentTask.status}
            <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
              <DownSvg />
            </span>
          </div>
          {isOpen && (
            <div className="dropdown-menu">
              {statuses.map((status) => (
                <div
                  key={status}
                  className="dropdown-item"
                  onClick={() => handleStatusChange(status)}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
