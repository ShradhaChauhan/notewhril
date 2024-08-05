import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const [notes, setNotes] = useState([]);

  //Function to fetch all notes
  const fetchAllNotes = async () => {
    console.log("Fetching all notes");

    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  //Function to add a note
  const addNote = async (title, description, tag) => {
    console.log("Adding a new note");

    //API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    await setNotes(notes.concat(note.savedNote));
  };

  //Function to update/edit a note
  const fnUpdateNote = async (id, title, description, tag) => {
    //API call to fecth notes
    // const data = {
    //   title: title,
    //   description: description,
    // };
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":  localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const json = await response.json();

    const newNotes = JSON.parse(JSON.stringify(notes));

    //Logic to edit a note
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);
  };

  //Function to delete a note
  const deleteNote = async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        fnUpdateNote,
        deleteNote,
        fetchAllNotes,
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
