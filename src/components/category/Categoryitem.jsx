import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateCategory, deleteCategory } from "../../features/categoryslice"
import { useRef, useEffect } from "react";

export default function Categoryitem({ category, isEditing, onEdit, onCancelEdit, isActive, onSelect }) {

  const [input, setInput] = useState(category.type)
  const categories = useSelector(state => state.category.categories)
  const dispatch = useDispatch()

  const btnClass = "w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0 hover:bg-gray-700 transition";

  const inputRef = useRef(null);
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();

    }
  }, [isEditing]);

  function handleSaveEdit() {
    dispatch(updateCategory({ id: category.id, type: input }))
    onCancelEdit()
  }

  return (<>
    {isEditing ?
      (<div className="flex justify-between items-center w-full p-2 rounded gap-2 min-w-0">
        <input
          value={input}
          ref={inputRef}
          onChange={(e) => setInput(e.target.value)}
          className="grow min-w-0 px-2 py-1 rounded bg-gray-800 text-white "
        />
        <button
          className={btnClass}
          onClick={() => handleSaveEdit()}>✅
        </button>
        <button
          className={btnClass}
          onClick={() => onCancelEdit()}>❌
        </button>
      </div>)
      :
      (<div
        onClick={onSelect}
        className={`flex justify-between items-center w-full p-2 rounded cursor-pointer gap-2
          ${isActive ? "bg-indigo-900 text-white" : "hover:bg-gray-700"}
        `}
      >
        <span className="grow min-w-0 px-2 py-1 rounded bg-gray-800 text-white"
        >{category.type}</span>
        <div className="flex gap-2 shrink-0">
          <button className={btnClass} onClick={(e) => { e.stopPropagation(); onEdit() }}>✏️</button>
          <button className={btnClass} onClick={(e) => { e.stopPropagation(); dispatch(deleteCategory(category.id)) }}>🗑️</button>
        </div>

      </div>)
    }
  </>)
}