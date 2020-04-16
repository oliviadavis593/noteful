import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Note from '../Note/Note';
import Button from '../Button/Button';
import NoteContext from '../NoteContext';
import './NoteList.css';

class NoteList extends Component {

  static contextType = NoteContext; 

  render() {
    const notes = this.context.notes;
    const folderId = this.props.match.params.folderId; 
     return(
       <section className='NoteList'>
         <ul>
         {folderId
            ? notes
                .filter(note => note.folderId === folderId)
                .map(note => (
                  <li key={note.id}>
                    <Note id={note.id} name={note.note_name} modified={note.modified} />
                  </li>
                ))
            : notes.map(note => (
                <li key={note.id}>
                  <Note id={note.id} name={note.note_name} modified={note.modified} />
                </li>
              ))}
         </ul>
        <div className='NoteList__button-container'>
          <Button
          tag={Link}
          to='/add-note'
          type='button'
          className='NoteList__add-note-button'
          >
            
            <br />
            Note
          </Button>
        </div>
      </section>
    )
  }
}

export default NoteList; 