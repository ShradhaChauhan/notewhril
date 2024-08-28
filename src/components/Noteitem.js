import React, { useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import { Tooltip } from "react-tooltip";
import jsPDF from "jspdf";

const Noteitem = (props) => {
  const { title, description, _id, tag } = props.note;
  const { updateNote } = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const viewNote = (note) => {
    document.querySelector("#viewNoteModalLabel").innerHTML = `${note.title} `;
    if (note.tag)
      document.querySelector("#viewModalTag").innerHTML = `${note.tag} `;
    else document.querySelector("#viewModalTag").innerHTML = "Default";

    document.querySelector(
      "#viewModalDescription"
    ).innerHTML = `${note.description} `;

    ref.current.click();
  };
// Function to generate PDF
  const ref = useRef(null);

  const handleGeneratePdfDocument = async (note) => {
    const { title, description } = note;
    try {
      const doc = new jsPDF();
      doc.setFontSize(36);
      let splitTitle = doc.splitTextToSize(title, 180);
      doc.text(splitTitle, 60, 20);
      doc.setFontSize(16);
      var splitDescription = doc.splitTextToSize(description, 180);
      //doc.text(splitDescription, 10, 40);
      let y = 15;
      let pageHeight = doc.internal.pageSize.getHeight();
      for (var i = 0; i < splitDescription.length; i++) {
        if (y >= pageHeight) {
          y = 15;
          i-=2;
          doc.addPage();
        }
        y = y + 10;
        doc.text(10, y + 10, splitDescription[i]);
      }   
      doc.save(title + ".pdf");
    } catch (e) {
      console.error("Error generating PDF: ", e);
    }
  };

  return (
    <div className="col-md-12 mt-2">
      {/* View Note Modal */}
      <button
        type="button"
        className="btn btn-primary visually-hidden"
        data-bs-toggle="modal"
        data-bs-target="#viewNoteModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="viewNoteModal"
        tabIndex="-1"
        aria-labelledby="viewNoteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="viewNoteModalLabel">
                {props.note.title}
              </h1>
              {props.note.tag && (
                <p className="ms-2 text-end">
                  <span className="badge text-bg-secondary" id="viewModalTag">
                    {props.note.tag}
                  </span>
                </p>
              )}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p id="viewModalDescription">{props.note.description}</p>
            </div>
          </div>
        </div>
      </div>
      {/* View Note Modal */}
      <div className="card m-0 negativeTop-40">
        <div className="card-body">
          <div className="d-flex">
            <h5 className="card-title col-8">{title}</h5>
            <div className="col-4">
              <Tooltip id="my-tooltip" />
              <i
                className="far fa-trash-alt mx-2 float-end"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Delete Note"
                data-tooltip-place="top"
                style={{ color: "#ec0909" }}
                onClick={() => {
                  deleteNote(_id);
                  props.showAlert("Note deleted successfully", "success");
                }}
              ></i>
              <i
                className="far fa-edit mx-2 float-end"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Update Note"
                data-tooltip-place="top"
                style={{ color: "#319424" }}
                onClick={() => {
                  updateNote(props.note);
                }}
              ></i>
              <i
                className="fa-solid fa-arrow-down-long mx-2 float-end"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Download PDF"
                data-tooltip-place="top"
                style={{ color: "#688be3" }}
                onClick={() => {
                  handleGeneratePdfDocument(props.note);
                }}
              ></i>
              <i
                className="fa-regular fa-eye mx-2 float-end"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="View Note"
                data-tooltip-place="top"
                style={{ color: "#f7bf05" }}
                onClick={() => {
                  viewNote(props.note);
                }}
              ></i>
            </div>
          </div>
          <span className="badge text-bg-secondary">{tag}</span>
          <p className="card-text mt-2">
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
