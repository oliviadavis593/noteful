import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import NoteList from './NoteList/NoteList'
import FolderList from './FolderList/FolderList'


class App extends Component {


  

  render() {
    return(
      <div className='App'>
        <header>
          <h1>
            <Link to='/'>
              Noteful {' '}
            </Link>
          </h1>
        </header>
        <nav>
         <FolderList />
         <NoteList />
        </nav>
        <main>
      
        </main>
      </div>
    )
  }
}

export default App; 

/*

 */