import NewColumn from "./NewColumn";
import { useState, useRef, useContext, useEffect } from "react";

export default function EmptyPage() {
  return (
    <>
      <div className="empty-page">
        <h4>This board is empty. Create a new column to get started.</h4>
        <button>+ Add New Column</button>
      </div>
    </>
  )
}