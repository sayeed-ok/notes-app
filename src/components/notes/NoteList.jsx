import { useSelector, useDispatch } from "react-redux";
import { updateNote, deleteNote, toggleNote } from '../../features/notesslice'
import { useState, useMemo, useCallback } from "react";

import NoteCard from "./NoteCard.jsx";
import EditNote from './EditNote.jsx'
import NoteModal from "./NoteModal.jsx";
import SearchNotes from "./SearchNotes.jsx";
import { moveNote } from "../../features/notesslice"


export default function NoteList({ activeCategoryId, setActiveCategoryId }) {

  const notes = useSelector(state => state.note.notes)
  const category = useSelector(state => state.category.categories)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState(null)// for edit the note ->  Edit Note Modal
  const [openNoteId, setOpenNoteId] = useState(null);// to open the note as a window
  const [searchQuery, setSearchQuery] = useState("")// for note search
  const [sortOption, setSortOption] = useState("date-newest");// for sorting







  //  for sorting
  function sortNotes(notes, option) {
    switch (option) {
      case "date-newest": return [...notes].sort((a, b) => b.createdAt - a.createdAt)
      case "date-oldest": return [...notes].sort((a, b) => a.createdAt - b.createdAt)
      case "title-az": return [...notes].sort((a, b) => a.title.localeCompare(b.title))
      case "title-za": return [...notes].sort((a, b) => b.title.localeCompare(a.title))
      default: return notes;
    }
  }



  /*                                          RENDERNOTE
    ▫️renderNote is stable
    ▫️and the functions INSIDE are also stable
    ▫️and NoteCard wrapped in React.memo WILL ACTUALLY SKIP renders
    🔸useCallback on renderNote only stabilizes the wrapper function; every inline () => ... inside it is still remade each execution, so you must memoize handlers individually to truly prevent re-renders.
                                                                                          */
  const handleEdit = useCallback((id) => setEditId(id), []);
  const handleDelete = useCallback((id) => dispatch(deleteNote(id)), [dispatch]);
  const handleTogglePin = useCallback((id) => dispatch(toggleNote(id)), [dispatch]);
  const handleOpen = useCallback((id) => setOpenNoteId(id), []);

  const renderNote = useCallback((note) => {
    return (
      <NoteCard
        key={note.id}
        note={note}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePin={handleTogglePin}
        onOpen={handleOpen}
        searchQuery={searchQuery}
      />
    );
  }, [handleEdit, handleDelete, handleTogglePin, handleOpen, searchQuery]);
  //




  /*                                            FILTER
    1️⃣ Category Filter (limit the universe)
    → Decide which category of notes we are looking at

    2️⃣ Search Filter (limit inside the universe)
    → Search only inside the category subset

    3️⃣

    4️⃣ Group into Pinned / Others (final view structure)
    → UI organization only AFTER all filtering is done
                                                                                            */
  // 1️⃣
  const filterActiveNotes = notes.filter(note => {
    if (!activeCategoryId) return true;
    return note.categoryId === activeCategoryId;
  });
  // 2️⃣
  const filteredNotes = filterActiveNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedNotes = useMemo(() => sortNotes(filteredNotes, sortOption), [filteredNotes, sortOption])

  // 4️⃣
  const pinned = sortedNotes.filter(note => note.pinned);
  const others = sortedNotes.filter(note => !note.pinned);
  //





  return (
    <div>


      <div className="flex  gap-5">
        {/* Search Bar */}
        <SearchNotes setSearchQuery={setSearchQuery} />


        {/*                    ⏺ FILTER CATEGORY DROPDOWN

          DATA FLOW
          User action → onChange → setActiveCategoryId → state updates → parent re-renders

          UI FLOW
          React re-renders <select value={activeCategoryId}>  
            ↓
          Browser finds the <option> whose value matches activeCategoryId  
            ↓
          That option is highlighted (becomes visible as selected)  
            ↓
          If activeCategoryId does NOT match any <option> value  
          the dropdown stays stuck on the previous option  
            ↓
          (That's the bug you had when passing null)  

                                                                                  */}
          <select
            value={activeCategoryId ?? ''}
            className="px-4 py-2 bg-neutral-800 rounded-lg border border-neutral-700 focus:border-indigo-500 outline-1 text-white"
            onChange={e => {
              const value = e.target.value;
              setActiveCategoryId(value === "" ? null : value);
            }}
          >
            <option value="">All</option>
            {category.map(c => (
              <option key={c.id} value={c.id}>{c.type}</option>
            ))}
          </select>
        {/*___________________________FILTER CATEGORY DROPDOWN______________________*/}


        {/*                                NOTE SORTING
        */}
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="date-newest">Newest first</option>
          <option value="date-oldest">Oldest first</option>
          <option value="title-az">A → Z</option>
          <option value="title-za">Z → A</option>
        </select>

      </div>




      {/* full note modal when clicked*/}
      {openNoteId && (
        <NoteModal noteId={openNoteId} onClose={() => setOpenNoteId(null)} />
      )}



      {/* ----- Edit Note Modal ------- */}
      {editId !== null &&
        <EditNote noteId={editId} onDone={() => setEditId(null)} />
      }





      {/* ----- PINNED SECTION ----- */}
      {pinned.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Pinned</h2>
          <div className="grid grid-cols-3 gap-4">
            {pinned.map(renderNote)}
          </div>
        </div>
      )}

      {/* ----- OTHERS SECTION ----- */}
      {others.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">All Notes</h2>
          <div className="grid grid-cols-3 gap-4">
            {others.map(renderNote)}
          </div>
        </div>
      )}

    </div>
  )
}