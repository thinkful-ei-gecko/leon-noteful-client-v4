import path from 'path';
import config from './config';
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';
// import 'normalize.css';
import "./App.css";
import {Link} from 'react-router-dom'
import Main from "./Components/Main";
import Sidebar from "./Components/Sidebar";
import FolderList from "./Components/FolderList";
import FolderDetailedView from "./Components/FolderDetailedView";
import NoteList from "./Components/NoteList";
import NoteDetailedView from "./Components/NoteDetailedView";
import NotFound from "./Components/NotFound";
import AddFolder from './Components/AddFolder';
import AddNote from './Components/AddNote'
import NotefulContext from "./NotefulContext";
import ErrorBoundary from './Components/ErrorBoundary'

class App extends Component {
  static contextType = NotefulContext;

  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      notes: []
    };
  }

  handleDeleteNote = noteId => {
    console.log('arrived at state change for delete');
    const newNotes = this.state.notes.filter(note => note.id !== noteId);
    this.setState({
      notes: newNotes
    },this.props.history.push('/'));
  };

  postAPI = (folderName) => {
    let jsonString = {name: folderName}
    let stringified = JSON.stringify(jsonString);
    fetch(`${config.REACT_APP_DB_URL}/folders`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: stringified
    })
    .then(response => {
      if (!response.ok) {
        console.log('got to first error');
        throw new Error(response.status);
      }
      return response;
    })
    .then(() => this.getFolders())
    .then(() => this.goToHome())
    .catch(error => alert(error));
  }

  postNoteAPI = (noteName, noteContent, noteFolder) => {
    let jsonString = {name: noteName,
                      content: noteContent,
                      folderId: noteFolder,
                      modified: new Date().toISOString()}
    let stringified = JSON.stringify(jsonString);
    fetch(`${config.REACT_APP_DB_URL}/notes`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: stringified
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      this.setState({
        notes: [...this.state.notes, data]
      }, this.goToHome());
    })
    .catch(error => alert(error));
  }

  goToHome () {
    this.props.history.push('/')
  }

  getFolders() {
    fetch(`${config.REACT_APP_DB_URL}/folders`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          folders: data
        });
      })
      .catch(error => alert(error));
  }

  getNotes() {
    fetch(`${config.REACT_APP_DB_URL}/notes`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${config.REACT_APP_API_KEY}`
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.setState({
          notes: data
        });
      })
      .catch(error => alert(error));
  }

  componentDidMount() {
    this.getNotes();
    this.getFolders();
  }

  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      postAPI: this.postAPI,
      postNoteAPI: this.postNoteAPI
    };

    return (
      <div className="app">
        <Link to ='/' className="header"><h1>Noteful</h1></Link>
        <NotefulContext.Provider value={contextValue}>
        <ErrorBoundary selection='sidebar'>
          <Sidebar>
            <Switch>
              <Route exact path="/" component={FolderList} />
              <Route path="/folder/:folderId" component={FolderList} />
              <Route path="/note/:noteId" component={FolderDetailedView} />
              <Route path='/add-folder' component={FolderList} />
              <Route path="/add-note" component={FolderList} />
              <Route component={NotFound} />
            </Switch>
          </Sidebar>
          </ErrorBoundary>
          <ErrorBoundary selection='content'>
          <Main>
            <Switch>
              <Route exact path="/" component={NoteList} />
              <Route path="/folder/:folderId" component={NoteList} />
              <Route path="/note/:noteId" component={NoteDetailedView} />
              <Route path="/add-folder" component={AddFolder} />
              <Route path="/add-note" component={AddNote} />
              <Route component={NotFound} />
            </Switch>
          </Main>
          </ErrorBoundary>
        </NotefulContext.Provider>
      </div>
    );
  }
}

export default withRouter(App)