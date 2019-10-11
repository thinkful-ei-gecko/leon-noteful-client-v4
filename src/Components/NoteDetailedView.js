import config from '../config';
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import NotefulContext from "../NotefulContext";

function deleteNoteRequest(noteId, callback) {
  fetch(`${config.REACT_APP_DB_URL}/notes/${noteId}`, {
    method: "DELETE",
    headers: {
      'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
    }
  })
  .then(response => {
    console.log('made it into delete response');
    if (!response.ok) {
      console.log('got to first error');
      throw new Error(response.status);
    }
    return response;
  })
    .then(data => {
      callback(noteId);
    })
    .catch(error => {
      console.error(error);
    });
}

class NoteDetailedView extends Component {
  static contextType = NotefulContext;

  render() {
    const { notes } = this.context;
    const { match } = this.props;
    const note = notes.find(note => note.id === parseInt(match.params.noteId)) || {} ;
    console.log(note);
    const newDate = new Date(note.date_modified);

    return (
      <div className="main__note-item detailed" key={note.id}>
        <div className="flex">
        <div className="leftSide">
        <p className="itemName">{note.name}</p>
        <p>{newDate.toDateString()}</p>
        </div>
        <div className="rightSide">
        <Link to="/">
          <button
            type="button"
            onClick={() => deleteNoteRequest(note.id, this.context.deleteNote)}
          >
            Delete note
          </button>
        </Link>
        </div>
        </div>
        <p className="noteDescription">{note.content}</p>
      </div>
    );
  }
}

export default withRouter(NoteDetailedView);
