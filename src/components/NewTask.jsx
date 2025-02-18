import { useState, useContext } from "react";
import { DownSvg } from "../Svg";
import { TaskContext } from "./TaskContext";

export default function NewTask() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask, activeBoard, setActiveBoard } = useContext(TaskContext);

  const [columns, setColumns] = useState(currentTask ? currentTask.subtasks.map((st) => st.title) : []);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentTask ? currentTask.status : "Todo");

  const statuses = ["Todo", "Doing", "Done"];

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  function addColumn(e) {
    e.preventDefault();
    setColumns([...columns, ""]);
  }

  function handleAddColumn(i, value) {
    const newColumns = [...columns];
    newColumns[i] = value;
    setColumns(newColumns);
  }

  const removeColumn = (index) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    formObj.id = crypto.randomUUID(); // Yeni görev için benzersiz bir id oluşturuyoruz
    formObj.subtasks = columns.map((title) => ({ title, isCompleted: false }));
    formObj.status = selectedStatus;

    // Yeni task'ı mevcut board'a eklemek
    setData((prevData) => {
      const newData = prevData && prevData.boards ? { ...prevData } : { boards: [] };

      // Aktif board'ı buluyoruz
      newData.boards = newData.boards.map((board) => {
        if (board.name !== activeBoard) return board;

        return {
          ...board,
          columns: board.columns.map((col) => {
            if (col.name !== selectedStatus) return col;

            return {
              ...col,
              tasks: [...(col.tasks || []), formObj], // Yeni görevi ilgili statüdeki column'a ekliyoruz
            };
          }),
        };
      });

      // Yeni veriyi localStorage'a kaydediyoruz
      localStorage.setItem("taskData", JSON.stringify(newData));
      return newData;
    });

    setCurrentTask(formObj);
    window.location.hash = "#/";
  }

  const updatedTasks = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const updatedTask = {
      ...currentTask,
      title: formObj.title || currentTask.title,
      description: formObj.description || currentTask.description,
      subtasks: columns.length > 0 ? columns.map((title) => ({ title, isCompleted: false })) : currentTask.subtasks,
      status: selectedStatus || currentTask.status,
    };

    setData((prevData) => {
      if (!prevData || !prevData.boards) return prevData;
      const newData = { ...prevData };

      for (let board of newData.boards) {
        if (board.name !== activeBoard) continue;

        for (let column of board.columns) {
          const taskIndex = column.tasks.findIndex((task) => task.id === currentTask.id);
          if (taskIndex !== -1) {
            // Önce eski statüden görevi çıkar
            const [updatedTask] = column.tasks.splice(taskIndex, 1);

            // Yeni bilgileri güncelle
            updatedTask.title = formObj.title || updatedTask.title;
            updatedTask.description = formObj.description || updatedTask.description;
            updatedTask.subtasks = columns.map((title) => ({ title, isCompleted: false }));
            updatedTask.status = selectedStatus;

            // Yeni statüye ekle
            const newColumn = board.columns.find((col) => col.name === selectedStatus);
            if (newColumn) newColumn.tasks.push(updatedTask);
            break;
          }
        }
      }

      // Veriyi localStorage'a kaydediyoruz
      localStorage.setItem("taskData", JSON.stringify(newData));
      return newData;
    });

    setEdit(false);
    setCurrentTask(null);
    e.target.reset();
    window.location.hash = "#/";
  };


  return (
    <>
      <form autoComplete="off" onSubmit={(e) => (isEdit ? updatedTasks(e) : handleSubmit(e))}>
        <div className="new-task-dialog-container">
          <h1>{isEdit ? "Edit Task" : "Add New Task"}</h1>
          <div className="newtask-title-section">
            <h4>Title</h4>
            <input
              type="text"
              defaultValue={currentTask ? currentTask.title : ""}
              name="title"
              placeholder="e.g. Take coffee break"
            />
          </div>
          <div className="newtask-description-section">
            <h4>Description</h4>
            <textarea
              name="description"
              defaultValue={currentTask ? currentTask.description : ""}
              placeholder="e.g. It’s always good to take a break."
            ></textarea>
          </div>
          <div className="newtask-subtasks-section">
            <h4>Subtasks</h4>
            {columns.map((column, index) => (
              <div className="flex" key={index}>
                <input
                  placeholder="e.g. Web Design"
                  type="text"
                  name="subtask"
                  value={column}
                  onChange={(e) => handleAddColumn(index, e.target.value)}
                />
                <img onClick={() => removeColumn(index)} src="/assets/images/cancel-icon.svg" alt="remove" />
              </div>
            ))}
            <button onClick={addColumn} className="addnew-subtask-btn">
              + Add New Subtask
            </button>
          </div>
          <div className="newtask-status-section">
            <h4>Status</h4>
            <div className="dropdown">
              <div className="dropdown-selected" onClick={() => setIsOpen(!isOpen)}>
                {selectedStatus}
                <span className={`dropdown-icon ${isOpen ? "rotated" : ""}`}>
                  <DownSvg />
                </span>
              </div>
              {isOpen && (
                <div className="dropdown-menu">
                  {statuses.map((status) => (
                    <div key={status} className="dropdown-item" onClick={() => handleSelect(status)}>
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="create-task-btn">
            {isEdit ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </>
  );
}