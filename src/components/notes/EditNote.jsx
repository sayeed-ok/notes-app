import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { updateNote } from "../../features/notesslice"

export default function EditNote({ noteId, onDone }) {
  const note = useSelector(state => state.note.notes.find(e => e.id === noteId))
  const category = useSelector(state => state.category.categories)
  const dispatch = useDispatch()

  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [selectId, setSelectId] = useState(note.categoryId)

  useEffect(() => {
    setTitle(note.title)
    setContent(note.content)
    setSelectId(note.categoryId)
  }, [noteId])

  function handleupdate(e) {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return;
    dispatch(updateNote({
      id: note.id,
      title,
      content,
      categoryId: selectId,
    }))
    onDone()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

      {/* MODAL */}
      <div className="relative bg-neutral-900 p-6 rounded-xl 
     w-full max-w-xl shadow-2xl border border-neutral-700 ">

        {/* CLOSE BUTTON */}
        <button
          onClick={onDone}
          className="absolute left-4 top-2 text-gray-400 hover:text-white text-xl"
        >
          ✖
        </button>


        <form onSubmit={handleupdate} className="space-y-4">


          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-indigo-500 outline-none text-white mt-5"
          />


          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full space-y-4 min-w-0 bg-neutral-800 p-3 rounded-lg border border-neutral-700 h-40 resize-none focus:border-indigo-500 outline-none text-white"
          />


          <select
            value={selectId}
            onChange={e => setSelectId(e.target.value)}
            className="w-full bg-neutral-800 p-3 rounded-lg border border-neutral-700 focus:border-indigo-500 outline-none text-white">

            {category.map(item => (
              <option key={item.id} value={item.id}>
                {item.type}
              </option>
            ))}
          </select>


          <div className="flex justify-end gap-3 ">
            <button
              type="button"
              onClick={onDone}
              className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-white"
            >Cancel </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
            >Update</button>
          </div>

        </form>
      </div>
    </div>
  )
}
