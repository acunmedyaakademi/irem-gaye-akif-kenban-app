import { useState } from "react";
import { DownSvg } from "../Svg";

export default function NewTask() {

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

  return (
    <>
      <form autoComplete="off">
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