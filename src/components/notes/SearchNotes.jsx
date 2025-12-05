import { useState, useRef, useEffect } from "react";

export default function SearchNotes({ setSearchQuery }) {
  const [query, setQuery] = useState("");

  /*
    Debounced Search 
    setTimeout is used to delay the search so it runs only after the user stops typing
    User types → Start 200ms timer → If user types again → cancel old timer → start new timer  
  */ 
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchQuery(query)
    }, 200)
    return () => clearTimeout(timeoutId);
  }, [query])

  // '/' to Focus Search Bar
  const inputRef = useRef(null);
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "/") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);


  return (
    <input
      type="text"
      placeholder="Search notes..."
      value={query}
      onChange={e => setQuery(e.target.value)}
      ref={inputRef}
      className="flex-1 text-gray-200 text-sm font-medium placeholder-indigo-500 outline-none 
        border-r-2 border-neutral-500"                 
    />
  );
}
