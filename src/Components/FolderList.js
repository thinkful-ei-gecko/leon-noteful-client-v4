import React from "react";
import { Link } from 'react-router-dom'
import FolderItem from "./FolderItem";
import NotefulContext from "../NotefulContext";
import ErrorBoundary from './ErrorBoundary'


export default class FolderList extends React.Component {
  static contextType = NotefulContext;

  render() {
    const folders = this.context.folders || [];
    const check = folders.map(folder => <ErrorBoundary selection='folder' key={folder.id + 'eb'}><FolderItem folder={folder} key={folder.id} /></ErrorBoundary>);

    return(
      <>
          <li className="sidebar__folder-list">
            {check}
          </li>
      <Link to='/add-folder' className="addFolder"><button type='button'>Add Folder</button></Link>
    </>
    );
  }
}
