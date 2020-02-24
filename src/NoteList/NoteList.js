import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Note from '../Note/Note';
import Button from '../Button/Button';
import STORE from '../store';
import './NoteList.css';

class NoteList extends Component {
  render() {
    return(
      <section className='NoteList'>
        <ul>
          {STORE.notes.map(note => 
            <li key={note.id}>
              <Note 
              id={note.id}
              name={note.name}
              modified={note.modified}
              />
            </li>  
          )}
        </ul>
        <div className='NoteList__button-container'>
          <Button
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteList__add-note-button'
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Note
          </Button>
        </div>
      </section>
    )
  }
}

export default NoteList; 