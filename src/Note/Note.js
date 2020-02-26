import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';

class Note extends Component {

    render() {
        const { name, id, modified } = this.props; 
        return(
            <div className='Note'>
                <h2 className='Note__title'>
                    <Link to={`/note/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button 
                className='Note__delete' 
                type='button'
                onClick={() => this.deleteNoteRequest}
                >
                    <FontAwesomeIcon icon='trash-alt' />
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

export default Note; 