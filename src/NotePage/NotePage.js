import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Note from '../Note/Note';
import STORE from '../store'
import './NotePage.css';

class NotePage extends Component {
    render() {
        const { noteId }  = this.props.match.params
        const note = STORE.notes.find(note => note.id === noteId);

        if (!note) {
            return <Redirect to='/' />;
        }

        return(
            <section className='NotePage'>
                   <Note 
                   id={note.id}
                   name={note.name}
                   modified={note.modified}
                   />
                <div className='NotePage__content'>
                    {note.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>    
                    )}
                </div>
            </section>
        )
    }
}

export default NotePage; 