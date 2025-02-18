import { useContext, useEffect, useState } from "react";
import { TaskContext } from "./TaskContext";

export default function Detail() {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(null); // seçilen taskı tutakn state

  useEffect(() => {
    // URL'deki task idye erişmek için
    const taskId = window.location.hash.split("/").pop();

    if (data && data.boards) {
      // tüm boardlar içinde dön
      for (let board of data.boards) {
        // tüm columnlar içinde dön
        for (let column of board.columns) {
          const foundTask = column.tasks.find(task => task.id.toString() === taskId); // bulunan task
          if (foundTask) {
            setSelectedTask(foundTask); //bulunan task seçili olanı tutan task stateine gönderiyoruz
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
      <h1>{selectedTask.title}</h1>
      <p>{selectedTask.description || "No description"}</p>

      <h2>
        Subtasks ({selectedTask.subtasks.filter(subtask => subtask.isCompleted).length} of {selectedTask.subtasks.length})
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