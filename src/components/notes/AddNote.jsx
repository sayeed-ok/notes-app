import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addNote } from "../../features/notesslice"


export default function AddNote({ onDone }) {
  const dispatch = useDispatch()
  const category = useSelector(state => state.category.categories)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectId, setSelectId] = useState(category[0]?.id || null)

  // Auto focus as soon as AddCategory mounts
  const titleRef = useRef(null)
  useEffect(() => {
    titleRef.current.focus()
  }, [])

  function handleAddnote(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) alert(!title.trim() ? 'title needed' : 'content needed');
    dispatch(addNote({
      title,
      content,
      categoryId: selectId,
    }))
    setTitle('')
    setContent('')
    onDone();// after form submition
  }

  return (
    <form onSubmit={handleAddnote}
      className="flex flex-col gap-4 p-4 bg-neutral-900 rounded-xl shadow-lg border border-neutral-800 max-w-xl animate-pop"
    >
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        ref={titleRef}
        onChange={(e) => setTitle(e.target.value)}
        className="px-4 py-2 rounded-lg bg-neutral-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Content */}
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="px-4 py-3 rounded-lg bg-neutral-800 text-white placeholder-gray-400 min-h-32 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Category select */}
      <select value={selectId} onChange={(e) => setSelectId(e.target.value)}
        className="px-4 py-2 rounded-lg bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {category.map((item) => (
          <option key={item.id} value={item.id}>
            {item.type}
          </option>
        ))}
      </select>

      <div className="flex items-center justify-end">
        {/* Close Button */}
        <button onClick={onDone}
          className="self-baseline hover:text-white text-lg px-6 py-2 font-medium transition"
        >
          ❌
        </button>
        {/* Add button */}
        <button type="submit"

          className="self-end px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
        >
          Add
        </button>
      </div>
    </form>
  );

}