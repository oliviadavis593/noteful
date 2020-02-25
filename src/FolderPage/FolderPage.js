import React, { Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import STORE from '../store';
import Button from '../Button/Button';
import './FolderPage.css';

class FolderPage extends Component {

    static defaultProps = {
        history: {
            goBack: () => {}
        },
        match: {
            params: {}
        }
    }

    render() {
        const note = STORE.notes.find(note => note.id === this.props.match.params.noteId);
        return(
            <div className='FolderPage'>
                <Button
                tag='button'
                role='link'
                className='FolderPage__back-button'
                onClick={() => this.props.history.goBack()}
                >
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
                    Back
                </Button>
                <h3 className='FolderPage__folder-name'>
                {note ? STORE.folders.find(folder => folder.id === note.folderId).name: ''}
                </h3>
            </div>
        )
    }
}



export default FolderPage; 