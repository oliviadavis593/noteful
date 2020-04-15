import React from 'react';
import STORE from './store'
import { Link } from 'react-router-dom'

function NoteList() {
    return(
        <section>
            <ul>
                {STORE.notes.map(note =>
                    <li key={note.id}>
                        <Link to={`/note/${note.id}`}>
                            {note.name}
                        </Link>
                    </li>
                )}
            </ul>
        </section>
    )
}

export default NoteList; 