import { useRef } from "react"

export default function NewTask() {


  return(
    <>
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
      <input type="text" placeholder="e.g. Make coffee" />
      <button className="closeBtn"><img src="/svg/close.svg" alt="" /></button>
      </div>
       <button className="addnew-subtask-btn">+ Add New Subtask</button>
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
    </>
  )
}