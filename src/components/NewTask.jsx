import { useState } from "react";


export default function NewTask() {

  const [columns,setColumns] = useState([]);

  function addColumn() {
    setColumns([...columns, ""]);
    console.log(columns)
  }

  function handleAddColumn(i,value) {
    const newColumns = [...columns];
    newColumns[i] = value;
    setColumns(newColumns)
  }

  const removeColumn = (index) => {
    const newColumns = columns.filter((column, i) => i !== index);
    setColumns(newColumns);
  };




  return(
    <>
    <form action="">
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
                <img onClick={() => removeColumn(index)} src="/assets/images/cancel-icon.svg"/>
              </div>
            ))}
        <button onClick={addColumn} className="addnew-subtask-btn">+ Add New Subtask</button>
        </div>
        <div className="newtask-status-section">
          <h4>Status</h4>
          <select>
            <option value="todo">Todo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button className="create-task-btn">Create Task</button>
      </div>
    </form>
    </>
  )
}