import { useState, useContext } from "react";
import { DownSvg } from "../Svg";
import { TaskContext } from "./TaskContext";

export default function NewTask() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);

  const [columns, setColumns] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // dropdown menü için
  const [selectedStatus, setSelectedStatus] = useState("Todo"); // Varsayılan değer

  const statuses = ["Todo", "Doing", "Done"];

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };

  function addColumn() {
    setColumns([...columns, ""]);
    console.log(columns)
  }

  function handleAddColumn(i, value) {
    const newColumns = [...columns];
    newColumns[i] = value;
    setColumns(newColumns)
  }

  const removeColumn = (index) => {
    const newColumns = columns.filter((column, i) => i !== index);
    setColumns(newColumns);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    formObj.id = crypto.randomUUID();
    formObj.upvotes = 0;
    formObj.status = "Planned";
    formObj.category = selectedCategory;
    formObj.comments = [];

    setFeedbacks((prevFeedbacks) => {
      const updatedFeedbacks = [formObj, ...prevFeedbacks];
      localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
      return updatedFeedbacks;
    });

    setCurrentFeedback(formObj);
    window.location.hash = `#/`;
    toast.success("Feedback added successfully!");
  }

  const updatedComments = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formObj = Object.fromEntries(form);

    const updatedFeedback = {
      ...currentFeedback,
      title: formObj.title || currentFeedback.title,
      description: formObj.description || currentFeedback.description,
      category: selectedCategory || currentFeedback.category,
      status: selectedStatus || currentFeedback.status,
    };

    const updatedFeedbacks = feedbacks.map((inv) =>
      inv.id === currentFeedback.id ? updatedFeedback : inv
    );

    setCurrentFeedback(updatedFeedback);
    setFeedbacks(updatedFeedbacks);
    localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));
    setEdit(false);
    setCurrentFeedback(null);
    e.target.reset();

    window.location.hash = "#/";
    toast.success("Feedback updated successfully!");
  };

  return (
    <>
      <form autoComplete="off" onSubmit={isEdit ? updatedComments : handleSubmit}>
        <div className="new-task-dialog-container">
          <h1>Add New Task</h1>
          <div className="newtask-title-section">
            <h4>Title</h4>
            <input type="text" placeholder="e.g. Take coffee break" />
          </div>
          <div className="newtask-description-section">
            <h4>Description</h4>
            <textarea name="" id="" placeholder="e.g. It’s always good to take a break. This 15 minute break will 
      recharge the batteries a little."></textarea>
          </div>
          <div className="newtask-subtasks-section">
            <h4>Subtasks</h4>

            <div className="subtask-input">
              <input required type="text" placeholder="e.g. Make coffee" />
              <button className="closeBtn"><img src="/svg/close.svg" alt="" /></button>
            </div>
            {columns.map((column, index) => (
              <div className="flex" key={index}>
                <input placeholder="e.g. Web Design" type="text" name="columns" value={column} onChange={(e) => handleAddColumn(index, e.target.value)} />
                <img onClick={() => removeColumn(index)} src="/assets/images/cancel-icon.svg" />
              </div>
            ))}
            <button onClick={addColumn} className="addnew-subtask-btn">+ Add New Subtask</button>
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
                    <div
                      key={status}
                      className="dropdown-item"
                      onClick={() => handleSelect(status)}
                    >
                      {status}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button className="create-task-btn">Create Task</button>
        </div>
      </form>
    </>
  )
}