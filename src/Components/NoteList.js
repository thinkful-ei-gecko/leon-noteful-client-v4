import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import NoteItem from "./NoteItem";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from './ErrorBoundary'

class NoteList extends Component {
  static contextType = NotefulContext;

  render() {
    let { notes } = this.context;
    const { match, location } = this.props;

    notes = location.pathname.length !== 1
        ? notes.filter(note => parseInt(note.folderid)===parseInt(match.params.folderId))
        : notes;

    return (
      <>
        <li className="main__note-list">
          {notes.map(note => <ErrorBoundary selection='note' key={note.id + 'eb'}><Link to={`/note/${note.id}`}><NoteItem note={note} key={note.id} /></Link></ErrorBoundary>)}
        </li>
        <Link to='/add-note' className="addNote"><button type='button'>+</button></Link>
      </>
    )
  }
}

export default withRouter(NoteList);