import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import notecontext from "../context/notes/Notecontext";
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(notecontext);
  const { notes, getNotes, editnote } = context;
  const [note, setnote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const ref = useRef(null);
  const refclose = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      
      getNotes();
    } else {
      navigate("/")
    }// eslint-disable-next-line
  }, []); 
  const updateNote = (currentnote) => {
    ref.current.click()
    setnote({id:currentnote._id, etitle:currentnote.title ,edescription:currentnote.description ,etag:currentnote.tag})
  }

  const handleclick = (e) => {
    editnote(note.id,note.etitle,note.edescription,note.etag)
    refclose.current.click()
}


const onchange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value }) //name become equal to value

}

  return (
    <>
      <Addnote />
<button ref={ref}  type="button" className="btn btn-primary d-none" data-bs-toggle="modal"  data-bs-target="#exampleModal">
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
      </div>
      <div className="modal-body">
      <form className='my-1'>
      <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="exampleInputEmail1" name='etitle' aria-describedby="emailHelp" minLength={2} required value ={note.etitle} onChange={onchange} />
          <div id="emailHelp" className="form-text"></div>
      </div>
      <div className="mb-3">
          <label htmlFor="desc" className="form-label" >Description</label>
          <input type="text" className="form-control" id="edescription" name='edescription' minLength={2} required value ={note.edescription} onChange={onchange} />
      </div>
      <div className="mb-3">
          <label htmlFor="desc" className="form-label" >Tag</label>
          <input type="text" className="form-control" id="etag" name='etag' value ={note.etag} onChange={onchange} />
      </div>

  </form>
      </div>
      <div className="modal-footer">
        <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleclick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className="row my-3">
        <h1 >Your notes</h1>
        {notes.length === 0 ? (
          <h3 className="p-3 m-3 bg-gradient rounded-5 shadow-lg">CREATE YOUR FIRST NOTE</h3>
        ) : (
          notes.map((note) => (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          ))
        )}
      </div>
    </>
  );
}

export default Notes;
