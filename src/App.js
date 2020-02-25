import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
import FolderList from './FolderList/FolderList';
import FolderPage from './FolderPage/FolderPage';
import NoteList from './NoteList/NoteList';
import NotePage from './NotePage/NotePage';

class App extends Component {


  renderNavRoutes() {
    return(
      <>
        {['/', 'folder/:folderId'].map(path => (
          <Route 
          exact
          key={path}
          path={path}
          component={FolderList}
          />
        ))}
        <Route 
        path='/note/:noteId'
        component={FolderPage}
        />
        <Route path='/add-folder' component={FolderPage} />
        <Route path='/add-note' component={FolderPage} />
      </>
    )
  }

  renderMainRoutes() {
    return(
      <>
        {['/', '/folder/:folderId'].map(path => (
          <Route 
          exact
          key={path}
          path={path}
          component={NoteList}
          />
        ))}
        <Route 
        path='/note/:noteId'
        component={NotePage}
        />
      </>
    )
  }

  render() {
    return(
      <div className='App'>
        <nav className='App__nav'>{this.renderNavRoutes()}</nav>
        <header className='App__header'>
          <h1>
            <Link to='/'>Noteful</Link>{' '}
            <FontAwesomeIcon icon='check-double' />
          </h1>
        </header>
        <main className='App__main'>
          {this.renderMainRoutes()}
        </main>
      </div>
    )
  }
}

export default App; 