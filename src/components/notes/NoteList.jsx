//
import { useSelector, useDispatch } from "react-redux";
import { updateNote, deleteNote, toggleNote } from '../../features/notesslice';
import { useState, useMemo, useCallback, useRef, useEffect } from "react";

// Components
import NoteCard from "./NoteCard.jsx";
import EditNote from './EditNote.jsx';
import NoteModal from "./NoteModal.jsx";
import SearchNotes from "./SearchNotes.jsx";

// Icon imports
import filterIcon from "../../assets/filter.png";
import sortIcon from "../../assets/sorting.png";
import gridIcon from "../../assets/grid-view.png";
import listIcon from "../../assets/list-view.png";






//                                  ⏺ FUNCTIONS⚙️

export default function NoteList({ activeCategoryId, setActiveCategoryId }) {
  const notes = useSelector(state => state.note.notes);
  const categories = useSelector(state => state.category.categories);
  const dispatch = useDispatch();

  const [editId, setEditId] = useState(null);          // Edit modal
  const [openNoteId, setOpenNoteId] = useState(null);  // View modal
  const [searchQuery, setSearchQuery] = useState("");  // Search text
  const [sortOption, setSortOption] = useState("date-newest");
  const [layoutMode, setLayoutMode] = useState("grid"); // grid | list
  const [showFilterMenu, setShowFilterMenu] = useState(false);// Dropdown filter menu
  const [showSortMenu, setShowSortMenu] = useState(false);  // Dropdown sort menu


  const filterRef = useRef(null);   // wrapper ref for click-outside for Dropdown filter
  const sortRef = useRef(null);     // wrapper ref for click-outside for Dropdown sort
  const topBarRef = useRef(null);   // top-bar wrapper to ensure overflow-visible

  // stable handlers for NoteCard
  const handleEdit = useCallback((id) => setEditId(id), []);
  const handleDelete = useCallback((id) => dispatch(deleteNote(id)), [dispatch]);
  const handleTogglePin = useCallback((id) => dispatch(toggleNote(id)), [dispatch]);
  const handleOpen = useCallback((id) => setOpenNoteId(id), []);

  // Render NoteCard function
  const renderNote = useCallback((note) => (
    <NoteCard
      key={note.id}
      note={note}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onTogglePin={handleTogglePin}
      onOpen={handleOpen}
      searchQuery={searchQuery}
      layoutMode={layoutMode}
    />
  ), [handleEdit, handleDelete, handleTogglePin, handleOpen, searchQuery]);


  // SORT helper
  function sortNotes(list, option) {
    switch (option) {
      case "date-newest": return [...list].sort((a, b) => b.createdAt - a.createdAt);
      case "date-oldest": return [...list].sort((a, b) => a.createdAt - b.createdAt);
      case "title-az": return [...list].sort((a, b) => a.title.localeCompare(b.title));
      case "title-za": return [...list].sort((a, b) => b.title.localeCompare(a.title));
      default: return list;
    }
  }

  // FILTER + SEARCH pipeline (UI row is separate from scroll area)
  const filterActiveNotes = notes.filter(note => {
    if (!activeCategoryId) return true;
    return note.categoryId === activeCategoryId;
  });

  const filteredNotes = filterActiveNotes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedNotes = useMemo(() => sortNotes(filteredNotes, sortOption), [filteredNotes, sortOption]);

  const pinned = sortedNotes.filter(n => n.pinned);
  const others = sortedNotes.filter(n => !n.pinned);





  // keyboard escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setShowFilterMenu(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Render filter menu function
  function renderFilterMenu() {
    if (!showFilterMenu) return null;
    return (
      <div
        className="
          absolute right-0 top-full mt-2
          w-44 max-h-60 overflow-auto
          bg-neutral-900/90 backdrop-blur-lg
          border border-neutral-700/30 shadow-2xl
          rounded-xl p-2 animate-fadeIn no-scrollbar
        "
      >
        <div
          onClick={() => { setActiveCategoryId(null); setShowFilterMenu(false); }}
          className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
        >
          All Categories
        </div>

        <div className="mt-1 border-t border-neutral-800/40" />

        {categories.map(c => (
          <div
            key={c.id}
            onClick={() => { setActiveCategoryId(c.id); setShowFilterMenu(false); }}
            className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
          >
            {c.type}
          </div>
        ))}
      </div>
    );
  }

  function renderSortMenu() {
    if (!showSortMenu) return null;

    return (
      <div
        className="
        absolute right-0 top-full mt-2
        w-44 bg-neutral-900/90 backdrop-blur-lg
        border border-neutral-700/30 shadow-xl
        rounded-xl p-2 animate-fadeIn
      "
      >
        <div
          onClick={() => { setSortOption("date-newest"); setShowSortMenu(false); }}
          className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
        >
          Newest first
        </div>

        <div
          onClick={() => { setSortOption("date-oldest"); setShowSortMenu(false); }}
          className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
        >
          Oldest first
        </div>

        <div
          onClick={() => { setSortOption("title-az"); setShowSortMenu(false); }}
          className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
        >
          A → Z
        </div>

        <div
          onClick={() => { setSortOption("title-za"); setShowSortMenu(false); }}
          className="px-3 py-2 rounded-lg text-gray-200 text-sm hover:bg-neutral-800 cursor-pointer"
        >
          Z → A
        </div>
      </div>
    );
  }

  // close dropdown filter & sort menu when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (!filterRef.current?.contains(e.target)) setShowFilterMenu(false);
      if (!sortRef.current?.contains(e.target)) setShowSortMenu(false);
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  //                                             ⏺ RETURN
  return (
    <div className="flex flex-col flex-1 min-h-0 gap-4 min-w-0">

      {/* TOP BAR:
          topBarRef ensures the dropdown is positioned relative to this wrapper.
          overflow-visible prevents clipping by parent scroll containers. */}
      <div ref={topBarRef} className="relative z-20 overflow-visible flex min-w-0">

        {/*Fist Row: Search + Filter button + SORT BUTTON  */}
        <div className="flex items-center gap-3 w-full px-3 rounded-lg bg-neutral-900/60 border border-neutral-700/30 backdrop-blur-md "
        >

          <SearchNotes setSearchQuery={setSearchQuery} />

          {/* Filter button + dropdown wrapper */}
          <div ref={filterRef} className="relative">
            <button
              onClick={() => setShowFilterMenu(prev => !prev)}
              className="p-1 rounded-md hover:bg-indigo-800/60 transition"
              aria-expanded={showFilterMenu}
              aria-haspopup="menu">

              <img src={filterIcon} className="" alt="Filter" />
            </button>
            {renderFilterMenu()}
          </div>
          {/* SORT BUTTON + DROPDOWN */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setShowSortMenu(prev => !prev)}
              className="p-1 rounded-md hover:bg-indigo-800/60 transition"
              aria-expanded={showSortMenu}
              aria-haspopup="menu"
            >
              <img src={sortIcon} className="" alt="Sort" />
            </button>
            {renderSortMenu()}
          </div>

        </div>

        {/* Secondary Row: Grid selection */}
        <div className="flex items-center gap-3 px-3 ">
          <button
            onClick={() => setLayoutMode("grid")}
            className={`p-1.5 rounded-lg ${layoutMode === "grid" ? "bg-indigo-600 text-white" : "bg-neutral-800"}`}
            aria-pressed={layoutMode === "grid"}>
            <img src={gridIcon} className="" alt="Grid" />          
            

          </button>

          <button
            onClick={() => setLayoutMode("list")}
            className={`p-1.5 rounded-lg ${layoutMode === "list" ? "bg-indigo-600 text-white" : "bg-neutral-800"}`}
            aria-pressed={layoutMode === "list"}>
            <img src={listIcon} className="" alt="List" />            
          </button>
        </div>
      </div>




      {/* SCROLLABLE NOTES AREA */}
      <div className="overflow-y-auto flex-1 min-h-0 min-w-0 p-2 no-scrollbar smooth-scroll">
        {/* min-h-0 is important inside flex column so overflow works correctly */}

        {/* FULL NOTE MODAL */}
        {openNoteId && <NoteModal noteId={openNoteId} onClose={() => setOpenNoteId(null)} />}

        {/* EDIT MODAL */}
        {editId !== null && <EditNote noteId={editId} onDone={() => setEditId(null)} />}

        {/* PINNED */}
        {pinned.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Pinned</h2>
            <div className={layoutMode === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"}>
              {pinned.map(renderNote)}
            </div>
          </div>
        )}

        {/* OTHERS */}
        {others.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-2">All Notes</h2>
            <div className={layoutMode === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-4"}>
              {others.map(renderNote)}
            </div>
          </div>
        )}

        {/* Empty state */}
        {pinned.length === 0 && others.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            No notes found.
          </div>
        )}
      </div>
    </div>
  );
}


/*                                            FILTER
    1️⃣ Category Filter (limit the universe)
    → Decide which category of notes we are looking at

    2️⃣ Search Filter (limit inside the universe)
    → Search only inside the category subset

    3️⃣

    4️⃣ Group into Pinned / Others (final view structure)
    → UI organization only AFTER all filtering is done
                                                                                            */

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
        */}