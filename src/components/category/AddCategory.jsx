import { useState, useRef, useEffect } from "react"
import { useDispatch } from "react-redux"
import { addCategory } from "../../features/categoryslice.jsx"

export default function AddCategory({ isadding, onDone }) {
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()
  const inputref = useRef(null)



  // Auto focus as soon as AddCategory mounts
  useEffect(() => {
    inputref.current?.focus();
  }, []);

  return (
    <div className="flex justify-between items-center w-full p-2 rounded gap-2 min-w-0">

      <div className="flex gap-2 shrink-0">
        <button
          className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shrink-0"
          onClick={() => {
            if (!category.trim()) {
              alert("Category cannot be empty!");
              return;
            }
            dispatch(addCategory(category))
            setCategory('')
            onDone()
          }}>Add</button>
        <button
          onClick={onDone}
          className="px-3 py-2 shrink-0 border-2 border-indigo-700 rounded-md"
        >❌</button>

      </div>

      <input
        placeholder="Enter Category..."
        ref={inputref}
        value={category}
        onChange={e => setCategory(e.target.value)}
        className="grow min-w-0 px-2 py-1 rounded-md bg-gray-800 text-white"
      />



    </div>)
}