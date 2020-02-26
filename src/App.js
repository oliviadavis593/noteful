import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import FolderList from './FolderList/FolderList';
import FolderPage from './FolderPage/FolderPage';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import config from './config';
import NoteContext from './NoteContext';

class App extends Component {
  state = {
    notes: [],
    folders:[]  
  }

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
    })
    .then(([notes , folders]) => {
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

  
  render() {
    const contextValue = {
      note: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote
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
          </main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App; 