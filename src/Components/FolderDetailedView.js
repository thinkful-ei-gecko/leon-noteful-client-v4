import React from 'react';
import { withRouter } from "react-router";
import NotefulContext from "../NotefulContext";

class FolderDetailedView extends React.Component {
  static contextType = NotefulContext;

  render() {
    const { folders, notes } = this.context || [];
    // const { match, history } = this.props

      // const notesFind = this.findNote(this.context.notes, 
      //   this.props.match.params.noteId) || {};
      const noteFind = notes.find(note => parseInt(note.id) === parseInt(this.props.match.params.noteId) ) || {}
        const folderFind = folders.find(folder => folder.id === parseInt(noteFind.folderid)) || []

    return (
      <div className='sidebar__folder-detailed-view'>
        <button type="button" onClick={() => this.props.history.goBack()}>Go back</button>
        <h2>{folderFind.name}</h2>
      </div>
    )
  }
}
//   }
// }

export default withRouter(FolderDetailedView);