import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import FolderList from './FolderList/FolderList';
import FolderPage from './FolderPage/FolderPage';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';
import AddFolder from './AddFolder/AddFolder';
import AddNote from './AddNote/AddNote';
import NavError from './NavError';
import MainError from './MainError';
//import EditNote from './EditNote/EditNote'
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
      fetch(`${config.API_ENDPOINT}/api/notes`),
      fetch(`${config.API_ENDPOINT}/api/folders`)
    ])
    .then(([noteResponse, folderResponse]) => {
      if(!noteResponse.ok)
        return noteResponse.json().then(e => Promise.reject(e))
      if(!folderResponse.ok)
        return folderResponse.json().then(e => Promise.reject(e))

        return Promise.all([noteResponse.json(), folderResponse.json()])
    })
    .then(([notes , folders]) => {
      this.setState({ notes, folders });
    })
    .catch(error => {
      console.error({ error });
    })
  }

  handleDeleteNote = note_id => {
    console.log(note_id)
    this.setState({
      notes: this.state.notes.filter(note => note.id !== note_id)
    })
  }


  addFolder = name => {
    this.setState({ folders: [...this.state.folders, name]})
  }

  addNote = note => {
    this.setState({ notes: [...this.state.notes, note]})
  }

  
  render() {
    const contextValue = {
      notes: this.state.notes, 
      folders: this.state.folders, 
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
      updateNote: this.updateNote
    }
    return(
      <NoteContext.Provider
      value={contextValue}
      >
        <div className='App'>
          <nav className='App__nav'>
            <NavError>
              <Route exact path='/' component={FolderList}/>
              <Route exact path='/folders/:folder_id' component={FolderList} />
              <Route path='/notes/:note_id' component={FolderPage} />
              <Route path='/add-folder' component={FolderPage} />
              <Route path='/add-note' component={FolderPage} />
            </NavError>
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Noteful</Link>{' '}
              
            </h1>
          </header>
          <main className='App__main'>
            <MainError>
              <Route exact path='/' component={NoteList} />
              <Route exact path='/folders/:folder_id' component={NoteList} />
              <Route path='/notes/:note_id' component={NotePage} />
              <Route path='/add-folder' component={AddFolder}/>
              <Route path='/add-note' component={AddNote} />
              {/*<Route path='/edit/noteId' component={EditNote} /> */}
            </MainError>
          </main>
        </div>
      </NoteContext.Provider>
    )
  }
}

export default App; 


/*
componentDidMount() {
  const { notes, folders} = STORE;
  // Promise.all([
  //   fetch(`${config.API_ENDPOINT}/api/notes`),
  //   fetch(`${config.API_ENDPOINT}/api/folders`)
  // ])
  // .then(([noteResponse, folderResponse]) => {
  //   if(!noteResponse.ok)
  //     return noteResponse.json().then(e => Promise.reject(e))
  //   if(!folderResponse.ok)
  //     return folderResponse.json().then(e => Promise.reject(e))

  //     return Promise.all([noteResponse.json(), folderResponse.json()])
  // })
  // .then(([notes , folders]) => {
    this.setState({ notes, folders });
  // })
  // .catch(error => {
  //   console.error({ error });
  // })

  // console.log();

}
*/