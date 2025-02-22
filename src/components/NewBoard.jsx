import { useState, useContext } from "react";
import "/style/new-board.css";
import { TaskContext } from "./TaskContext";
import toast from "react-hot-toast"

export default function NewBoard({ onClose, isNewBoardDialogOpen, setIsNewBoardDialogOpen }) {
  const { data, setData, isEdit, setEdit, currentTask, setCurrentTask, activeBoard, setActiveBoard } = useContext(TaskContext);
  const [boardName, setBoardName] = useState("");
  const [columns, setColumns] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
  }

 // Dialog içindeki input alanı ekle
  function addColumn() {
    setColumns([...columns, ""]);
    console.log(columns)
  }

  function handleAddColumn(i, value) {
    const newColumns = [...columns];
    newColumns[i] = value;
    setColumns(newColumns)
  }

  // Dialog içindeki input alanını silme
  function removeColumn(index) {
    const newColumns = columns.filter((column, i) => i !== index);
    setColumns(newColumns);
  };

  function createBoard() {
    if (!boardName.trim()) return;

    const newBoard = {
      id: Date.now(),
      name: boardName,
      columns: columns.map(name => ({ id: Date.now() + Math.random(), name, tasks: [] }))
    };

    setData({ ...data, boards: [...data.boards, newBoard] });
    setActiveBoard(boardName);
    setIsNewBoardDialogOpen(false);
    toast.success("Board added successfully!");
  };

  return (
    <>
      <div className="new-board-container">
        <h2>Add New Board</h2>
        <form>
          <div className="board-name-area">
            <label htmlFor="name">Board Name</label>
            <div>
              <input type="text" name="name" placeholder="e.g. Web Design" value={boardName} onChange={(e) => setBoardName(e.target.value)} />
            </div>
          </div>
          <div className="column-area">
            <label htmlFor="columns">Board Columns</label>
            {columns.map((column, index) => (
              <div className="flex" key={index}>
                <input type="text" name="columns" value={column} onChange={(e) => handleAddColumn(index, e.target.value)} />
                <img onClick={() => removeColumn(index)} src="/assets/images/cancel-icon.svg" />
              </div>
            ))}
          </div>
          <div className="button-area">
            <button className="addnewcolumn" type="button" onClick={addColumn}>+ Add New Column</button>
            <button className="createnewboard" type="button" onClick={createBoard}>Create New Board</button>
          </div>
        </form>
      </div>
    </>
  )
}