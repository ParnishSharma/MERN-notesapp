import React, { useState } from 'react'
import { useContext } from 'react'
import notecontext from "../context/notes/Notecontext";

const Addnote = () => {
    const context = useContext(notecontext);
    const { addnote } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const handleclick = (e) => {
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setnote({ title: "", description: "", tag: "" })
    }


    const onchange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value }) //name become equal to value


    }

    return (
        <div>
            <div className="container my-3">
                <form className='my-1'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange} />
                        <div id="emailHelp" className="form-text" minLength={5} required></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label" >Description</label>
                        <input type="text" className="form-control" id="description" name='description' minLength={5}  value={note.description} required onChange={onchange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="desc" className="form-label"  value={note.tag}>Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' value={note.tag}  onChange={onchange} />
                    </div>

                    <button disabled={note.title.length<3 || note.description.length<3} type="submit" className="btn btn-primary"   onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
