import { useContext, useEffect, useState } from "react";
import { DownSvg, PlusSvg, SettingSvg, BoardSvg, KanbanSvg, HideSidebarSvg, EyeSvg } from "../Svg";
import { TaskContext } from "./TaskContext";

import DeleteDialog from "./DeleteDialog";
import DropdownMenu from "./DropDownMenu";

export default function Detail() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask, activeBoard, setActiveBoard } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleEditDialog() {
    setEdit(true);
    setCurrentTask(selectedTask);
    window.location.hash = "#/new-task";
  }

  const handleDelete = () => {
    console.log("Delete Task clicked");
    setIsOpen(false);
    setIsDialogOpen(true);
  };

  const confirmDelete = () => {
    console.log("Task deleted!");

    // Task'ı data'dan silme işlemi
    const taskId = selectedTask.id;

    for (let board of data.boards) {
      for (let column of board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1); // Task'ı sil
          setSelectedTask(null);
          setIsDialogOpen(false);
          window.location.hash = '/';
          return;
        }
      }
    }
  };

  const cancelDelete = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const taskId = window.location.hash.split("/").pop();

    if (data && data.boards) {
      for (let board of data.boards) {
        for (let column of board.columns) {
          const foundTask = column.tasks.find(
            (task) => task.id.toString() === taskId
          );
          if (foundTask) {
            setSelectedTask(foundTask);
            return;
          }
        }
      }
    }
  }, [data]);

  if (!selectedTask) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-container">
      <div className="title-setting-section relative">
        <h1>{selectedTask.title}</h1>

        <div className="dropdown-wrapper relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="setting-icon"
          >
            <SettingSvg />
          </button>

          {isOpen && (
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

        {/* Onay Diyaloğu */}
        {isDialogOpen && (
          <DeleteDialog onConfirm={confirmDelete} onCancel={cancelDelete} />
        )}
      </div>

      <p>{selectedTask.description || "No description"}</p>

      <h2>
        Subtasks ({selectedTask.subtasks.filter((subtask) => subtask.isCompleted).length}{" "}
        of {selectedTask.subtasks.length})
      </h2>

      <ul className="detail-checkbox-completed">
        {selectedTask.subtasks.map((subtask, index) => (
          <div key={index} className="detail-checkbox">
            <input type="checkbox" checked={subtask.isCompleted} readOnly />
            <li>{subtask.title}</li>
          </div>
        ))}
      </ul>

      <div className="newtask-status-section">
        <h4>Current Status</h4>
        <select defaultValue={selectedTask.status.toLowerCase()}>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  );
}
