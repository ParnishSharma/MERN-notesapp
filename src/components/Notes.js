import React from 'react'
import { useContext } from 'react'
import notecontext from "../context/notes/Notecontext";
import Noteitem from './Noteitem';

const Notes = () => {
    const context = useContext(notecontext);
    const { notes, setnotes } = context;
  return (
    <div className="row my-3">
        <h1> Your notes</h1>

        {notes.map((note) => {
          return <Noteitem note={note}/>
           
        })}
      </div>
  )
}

export default Notes
