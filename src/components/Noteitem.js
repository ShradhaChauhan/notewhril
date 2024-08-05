import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const { title, description, _id, tag } = props.note;
  const { updateNote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title col-8">{title}</h5>
            <div className="col-4">
                <i className="far fa-trash-alt mx-2 float-end" style={{ color: "#ec0909" }} onClick={()=>{ deleteNote(_id); props.showAlert("Note deleted successfully", "success") }}></i>
                <i className="far fa-edit mx-2 float-end" style={{ color: "#319424" }} onClick={()=>{ updateNote(props.note) }}></i>
            </div>
          </div>
          <span className="badge text-bg-secondary">{tag}</span>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
