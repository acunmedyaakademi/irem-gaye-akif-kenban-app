import { useState } from "react";
import "/style/new-board.css";

export default function NewBoard() {

  const [columns,setColumns] = useState([]);
  console.log(columns);

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
    <div className="new-board-container">
      <h2>Add New Board</h2>
      <form>
        <div className="board-name-area">
          <label htmlFor="name">Board Name</label>
          <div>
          <input type="text" name="name" placeholder="e.g. Web Design"/>
          </div>
        </div>
        <div className="column-area">
          <label htmlFor="columns">Board Columns</label>
          {columns.map((column, index) => (
            <div className="flex" key={index}>
              <input type="text" name="columns" value={column} onChange={(e) => handleAddColumn(index, e.target.value)} />
              <img onClick={() => removeColumn(index)} src="/assets/images/cancel-icon.svg"/>
            </div>
          ))}
         </div>
        <div className="button-area">
        <button type="button" onClick={addColumn}>+ Add New Column</button>
        <button type="button">Create New Board</button>
        </div>
      </form>
    </div>
    </>
  )
}