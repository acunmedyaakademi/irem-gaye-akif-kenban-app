import { useContext, useState } from "react"
import { DataContext } from "../App";

export default function Detail() {

  const data = useContext(DataContext);
  console.log(data)

  const [ selectedTask, setSelectedTask ] = useState(null)

  return(
    <>
    <div className="detail-container">
    <h1>Research pricing points of various competitors and trial different business models</h1>
     <p>We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.</p>
     <h2>Subtasks (2 of 3)</h2>
      <ul className="detail-checkbox-completed">
        <div className="detail-checkbox">
        <input type="checkbox" />
        <li>Research competitor pricing and business models</li>
        </div>
        <div className="detail-checkbox">
          <input type="checkbox" />
          <li>Outline a business model that works for our solution</li>
          </div>
          <div className="detail-checkbox">
          <input type="checkbox" />
          <li>Surveying and testing</li>
          </div>
      </ul>
      <div className="newtask-status-section">
        <h4>Current Status</h4>
        <select>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
    
    </>
  )
}