import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FolderList from './FolderList/FolderList';
import FolderPage from './FolderPage/FolderPage';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import config from './config';
import NoteContext from './NoteContext';
import './App.css';

class App extends Component {
  state = {
    notes: [],
    folders: []
  }

  static contextType = NoteContext; 

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/notes`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
    .then(([noteResponse, folderResponse]) => {
      if(!noteResponse.ok)
        return noteResponse.json().then(e => Promise.reject(e))
      if(!folderResponse.ok)
        return folderResponse.json().then(e => Promise.reject(e))

        return Promise.all([noteResponse.json(), folderResponse.json()])
    })
    .then(([notes , folders]) => {
      console.log("Setting notes and folders data in state");
      this.setState({ notes, folders });
    })
    .catch(error => {
      console.error({ error });
    })
  }

  handleDeleteNote = noteId => {
    this.setState({
      notes: this.state.notes.filter(note => note.id !== noteId)
    })
  }


  updateFolders(name) {
    this.setState({name})
  }

  updateNotes(newNote) {
    this.setState({newNote})
  }

  
  render() {
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote,
      addFolder: this.updateFolders,
      addNote: this.updateNotes
    }
    return(
      <NoteContext.Provider
      value={contextValue}
      >
        <div className='App'>
          <nav className='App__nav'>
            <Route exact path='/' component={FolderList}/>
            <Route exact path='/folder/:folderId' component={FolderList} />
            <Route path='/note/:noteId' component={FolderPage} />
            <Route path='/add-folder' component={FolderPage} />
            <Route path='/add-note' component={FolderPage} />
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            <Route exact path='/' component={NoteList} />
            <Route exact path='/folder/:folderId' component={NoteList} />
            <Route path='/note/:noteId' component={NotePage} />
            <Route path='/add-folder' component={AddFolder}/>
            <Route path='/add-note' component={AddNote} />
          </main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App; 