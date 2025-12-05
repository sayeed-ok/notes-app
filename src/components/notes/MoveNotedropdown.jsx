import { useState, useRef, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { moveNote } from "../../features/notesslice"
import Portal from "../utilities/Portal.jsx"












export default function MoveNoteDropdown({ noteId, categoryId }) {
  const categories = useSelector((s) => s.category.categories);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const current = categories.find((c) => c.id === categoryId);

  // Position menu when opened
  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width + 40,
      });
    }
  }, [open]);

  // CLICK OUTSIDE — includes menuRef + buttonRef
  useEffect(() => {
    function handleClick(e) {
      if (!open) return;

      if (
        !buttonRef.current.contains(e.target) &&
        !menuRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // ----------------------------------
  //            FUNCTIONALIZED MENU
  // ----------------------------------
  function renderCategoryMenu() {
    if (!open) return null;

    return (
      <Portal>
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: pos.top,
            left: pos.left,
            width: pos.width,
            zIndex: 999999,
          }}
          className="
            bg-neutral-900/70 border border-neutral-700/30 shadow-2xl rounded-xl p-2 animate-fadeIn no-scrollbar"                                  
        >
          {categories.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                dispatch(moveNote({ id: noteId, categoryId: c.id }));
                setOpen(false);
              }}
              className={`
                px-3 py-2 text-sm rounded-xl cursor-pointer text-gray-200
                hover:bg-neutral-800 my-1 
                ${c.id === current.id ? "bg-neutral-800 text-indigo-400" : ""}
              `}
            >
              {c.type}
            </div>
          ))}
        </div>
      </Portal>
    );
  }

  // ----------------------------------

  return (
    <>
      {/* BUTTON */}
      <button
        ref={buttonRef}
        onClick={() => setOpen((p) => !p)}
        className="
          p-2 rounded-xl hover:bg-indigo-800/60 transition delay-75
           
          text-gray-200 text-sm
        "
      >
        {current.type} ▾
      </button>

      {/* FUNCTIONALIZED MENU */}
      {renderCategoryMenu()}
    </>
  );
}





































































/*
 <select
        value={categoryId}
        onClick={(e) => e.stopPropagation()}
        className="w-full bg-neutral-900 p-2 rounded-lg border border-neutral-700 focus:border-indigo-500 outline-none text-white"
        onChange={e => {

          // console.log('before-movenotedropdown',e.target.value)
          const newCategoryId = e.target.value
          dispatch(moveNote({ id: noteId, categoryId: newCategoryId }))
        }}
      >

        {category.map(item => (
          <option key={item.id} value={item.id} className="">
            {item.type}
          </option>
        ))}
      </select>
*/