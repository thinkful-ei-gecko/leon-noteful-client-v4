import React from 'react'
import NotefulContext from '../NotefulContext'

export default class AddNote extends React.Component {

    static contextType = NotefulContext;

    constructor(props){
        super(props)
        this.state = {
          noteName: '',
          noteContent: '',
          noteFolder: '',
        }
    }
    
    handleAddNoteSubmit = (event) => {
        event.preventDefault();
        const noteName = this.state.noteName;
        const noteContent = this.state.noteContent;
        const noteFolder = this.state.noteFolder;
        this.context.postNoteAPI(noteName, noteContent, noteFolder);
    }

    updateNoteName(noteName) {
        this.setState({noteName});
    }

    updateNoteContent(noteContent) {
        this.setState({noteContent});
        console.log(noteContent);
    }

    updateNoteFolder(noteFolder) {
        this.setState({noteFolder})
        console.log(noteFolder)
    }

    render () {

        let { folders } = this.context;

        return (
            <form className='add-note' onSubmit={(e) => this.handleAddNoteSubmit(e)}>
                <label htmlFor='addNote'>Note title: </label>
                <input type='text' id='addNote' name='addNote'
                        onChange={e => this.updateNoteName(e.target.value)} required></input>
                <label htmlFor='content'>Content: </label>
                <textarea id='content' name='content' required onChange={(e)=> this.updateNoteContent(e.target.value)}></textarea>
                <select onChange={e => this.updateNoteFolder(e.target.value)} required>
                    <option value=''>Please select a folder below</option>
                    {folders.map((folder) => 
                        <option value={folder.id} key={folder.id}>{folder.name}</option>
                    )}
                </select>
                <div class="flex">
                <button type='submit'>Add Note</button>
                <button type='button' onClick={() => this.props.history.goBack()}>Go back</button>
                </div>
            </form>        
        )
    }
}
