import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [data, setData] = useState([]);
  const [isEdit, setEdit] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [activeBoard, setActiveBoard] = useState(() => {
    return data?.boards?.length > 0 ? data.boards[0].name : "";
  });


  // Sayfa yüklendiğinde `localStorage` kontrol et, yoksa `data.json`'dan al**
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("taskData"));

    if (storedTasks && storedTasks.length > 0) {
      setData(storedTasks);
    } else {
      async function getData() {
        const data = await fetch("data/data.json").then(res => res.json());
        setData(data);
        localStorage.setItem("taskData", JSON.stringify(data));
      }
      getData();
    }
  }, []);

  // `data` değiştiğinde `localStorage`'ı güncelle**
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("taskData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <TaskContext.Provider
      value={{ data, setData, isEdit, setEdit, currentTask, setCurrentTask, activeBoard, setActiveBoard }}
    >
      {children}
    </TaskContext.Provider>
  );
}
