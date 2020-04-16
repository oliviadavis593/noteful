import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';
import config from '../config'
import './Note.css';

class Note extends Component {
  
    static contextType = NoteContext; 

    handleClickDelete = e => {
       
        const noteId = this.props.id
        //`${config.API_ENDPOINT}/api/notes`
        fetch(`${config.API_ENDPOINT}/api/notes/:note_id`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))
                
                return response.json()
        })
        .then(() => {
            this.context.deleteNote(noteId)
            //allows parent to perform extra behavior
            this.props.onDeleteNote(noteId)
        })
        .catch(error => {
            console.error({ error })
        })
    }

    render() {
        const { name, id, modified } = this.props; 
        return(
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/notes/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                className='Note__delete' 
                type='button'
                onClick={() => this.handleClickDelete()}
                >
                    
                    {' '}
                    remove
                </button>
                <div className='Note__dates'>
                    <div className='Note__dates-modified'>
                    Modified
                        {' '}
                        <span className='Date'>
                            {modified}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

Note.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string.isRequired
}

export default Note; 