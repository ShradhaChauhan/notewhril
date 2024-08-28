import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import './styles.css'
const Notes = (props) => {
  let navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, fetchAllNotes, fnUpdateNote } = context;

  useEffect(() => {
    console.log("Auth Token- " + localStorage.getItem('token'));
    if(localStorage.getItem('token')){
      fetchAllNotes();
        document.title = 'Create your Notes on NoteWhril';
    }
    else{
      navigate("/About");
    }
    //eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "default",
  });

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  //Function to update the note
  const handleOnUpdateNote = (e) => {
    fnUpdateNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Note Updated Successfully", "success");
  };

  const ref = useRef(null);
  const refClose = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button
        type="button"
        className="btn btn-primary visually-hidden"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={3}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-outline-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn purpleBtn"
                onClick={handleOnUpdateNote}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row d-flex sidebarBg minHeight-100vh height-auto mt-0 pb-5">
        <h2 className="text-center mt-5 mb-5">Your Notes</h2>
        {notes.length === 0 && <p className='container d-flex justify-content-center negativeTop-180'>
           {/* {notes.length === 0 && "No notes to display"} */}
           No notes to display
        </p>}
        {notes.map((note) => {
          return (
            <Noteitem note={note} updateNote={updateNote} key={note._id} showAlert={props.showAlert} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
