import { useState, useEffect, useContext, useRef } from "react";
import { TaskContext } from "./TaskContext";

export default function NewColumn({ onClose }) {
  const { data, setData } = useContext(TaskContext);
  const [inputs, setInputs] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState('');
  const [boardData, setBoardData] = useState(null);
  const resetRef = useRef();

  useEffect(() => {
    if (data.boards.length > 0) {
      setSelectedBoardId(data.boards[0].id);
    }
  }, [data.boards]);

  useEffect(() => {
    const board = data.boards.find((x) => x.id === selectedBoardId);
    setBoardData(board || null);
  }, [selectedBoardId, data]);

  useEffect(() => {
    if (boardData?.columns) {
      setInputs(
        boardData.columns.map((column) => ({
          id: column.id,
          name: column.name,
        }))
      );
    }
  }, [boardData]);

  function addNewColumnInput(e) {
    e.preventDefault();
    const newInput = {
      id: crypto.randomUUID(),
      name: "",
    };
    setInputs([...inputs, newInput]);
  }

  function handleColumnSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);

    const updatedColumns = inputs.map((input) => ({
      id: input.id,
      name: formObj[`columnName${input.id}`] || input.name,
      tasks: boardData?.columns?.find(x => x.id === input.id)?.tasks || [],
    }));

    const updatedData = data.boards.map((board) =>
      board.id === selectedBoardId
        ? { ...board, columns: updatedColumns }
        : board
    );

    setData({ ...data, boards: updatedData });
    resetRef.current.reset();
    if (onClose) onClose();
  }

  function removeColumn(id) {
    setInputs(inputs.filter((input) => input.id !== id));
  }

  return (
    <div className="new-board-container">
      <h2>Add New Column</h2>
      <form ref={resetRef} onSubmit={handleColumnSubmit}>
        <div className="board-name-area">
          <label htmlFor="name">Name</label>
          <input
            disabled
            type="text"
            name="name"
            defaultValue={boardData?.name || ""}
            placeholder="e.g. Web Design"
          />
        </div>
        <div className="column-area">
          <label htmlFor="columns">Columns</label>
          {inputs.map((input) => (
            <div className="flex" key={input.id}>
              <input
                type="text"
                name={`columnName${input.id}`}
                defaultValue={input.name}
              />
              <img
                onClick={() => removeColumn(input.id)}
                src="/assets/images/cancel-icon.svg"
                alt="remove"
              />
            </div>
          ))}
        </div>
        <div className="button-area">
          <button type="button" onClick={addNewColumnInput} className="addnewcolumn-board">
            + Add New Column
          </button>
          <button type="submit" className="savechanges-board">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
