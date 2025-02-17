import "/style/new-board.css";

export default function NewBoard() {
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
          <div className="flex">
            <input type="text" name="columns"/>
            <img src="/assets/images/cancel-icon.svg"/>
          </div>
        </div>
        <div className="button-area">
        <button>+ Add New Column</button>
        <button>Create New Board</button>
        </div>
      </form>
    </div>
    </>
  )
}