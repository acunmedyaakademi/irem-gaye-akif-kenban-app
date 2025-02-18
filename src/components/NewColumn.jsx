import { useState, useEffect } from "react";


export default function NewColumn() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  const [columns, setColumns] = useState([]);
  console.log(columns);

  function addColumn() {
    setColumns([...columns, ""]);
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
    <div className="new-board-container">
    <h2>Add New Board</h2>
    <form onSubmit={handleSubmit}>
      <div className="board-name-area">
        <label htmlFor="name">Board Name</label>
        <div>
          <input type="text" name="name" placeholder="e.g. Web Design" />
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
        <button type="button" onClick={addColumn}>+ Add New Column</button>
        <a href="#/"><button type="button">Create New Board</button></a>
      </div>
    </form>
  </div>
  )
}