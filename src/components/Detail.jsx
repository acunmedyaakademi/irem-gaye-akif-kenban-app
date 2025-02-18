import { useContext } from "react"
import { DataContext } from "../App";

export default function Detail() {

  const data = useContext(DataContext);
  console.log(data.boards)

  

  return (
    <>
      {data && data.boards ? (
        data.boards.map(board => 
          board.columns.map(column =>
            column.tasks.map(task => (
              <div key={task.id} className="detail-container">
                <h1>{task.title}</h1>
                <p>{task.description || "No description"}</p>
                
                <h2>Subtasks ({task.subtasks.filter(subtask => subtask.isCompleted).length} of {task.subtasks.length})</h2>
                
                <ul className="detail-checkbox-completed">
                  {task.subtasks.map((subtask, index) => (
                    <div key={index} className="detail-checkbox">
                      <input type="checkbox" checked={subtask.isCompleted} readOnly />
                      <li>{subtask.title}</li>
                    </div>
                  ))}
                </ul>
                
                <div className="newtask-status-section">
                  <h4>Current Status</h4>
                  <select defaultValue={task.status.toLowerCase()}>
                    <option value="todo">Todo</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
            ))
          )
        )
      ) : (
        <div>Loading...</div> 
      )}
    </>
  );
  
}

