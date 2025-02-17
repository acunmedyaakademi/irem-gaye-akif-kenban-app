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
      <input type="text" placeholder="e.g. Make coffee" />
       <button><img src="" alt="" /></button>
      <input type="text" placeholder="e.g. Drink coffee & smile" />

      </div>

    </div>
    </>
  )
}