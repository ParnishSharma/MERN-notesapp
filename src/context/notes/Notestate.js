import React, { useState } from "react";
import Notecontext from "./Notecontext";


const Notestate = (props) => {
  const host = "http://localhost:5000";

  const notesinitial = []

  const [notes, setNotes] = useState(notesinitial)

  const getNotes = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'Content-Type': "application/json",
            "auth-token": token
          }
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch notes.");
        }
  
        const data = await response.json();
        const notesArray = data.length > 0 ? data[0] : [];
        setNotes(notesArray);
      } catch (error) {
        console.error(error);
        // Handle the error, for example, show a message to the user or redirect to a error page
      }
    }
  };


  //ADD A NOTE
  const addnote = async (title, description, tag) => {
    //to do api call

// eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })

    });
const note=await response.json();
setNotes(notes.concat(note))

  }


  //DELET A NOTE
  const deletenote = async (id) => {


    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': "application/json",
        "auth-token": localStorage.getItem('token')

      },
    });

    const json = await response.json();
console.log(json)
    const newnotes = notes.filter((note) => { return note._id !== id });
    setNotes(newnotes);
  }


  //EDIT A NOTE
  const editnote = async (id, title, description, tag) => {

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log(json)

    let newnotes=JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];

      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].description = description;
        newnotes[index].tag = tag;
        break;
      }
      

    }
    setNotes( newnotes);

  }
  return (

    <Notecontext.Provider value={{ notes, addnote, deletenote, editnote, getNotes }}>
      {props.children}
    </Notecontext.Provider>

  )

}


export default Notestate