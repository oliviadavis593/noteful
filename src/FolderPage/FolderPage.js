import React, { Component} from 'react';
import NoteContext from '../NoteContext';
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

    static contextType = NoteContext;  

    render() {
        const {notes, folders } = this.context; 
        console.log("folders", folders)
        const { note_id } = this.props.match.params
        const note = notes.find(note => note.id === parseInt(note_id));
        const currNote = notes.find((n) => n.id === +note_id);
        console.log(notes, folders)
        return(
            <div className='FolderPage'>
                <Button
                tag='button'
                role='link'
                className='FolderPage__back-button'
                onClick={() => this.props.history.goBack()}
                >
                    
                    <br />
                    Back
                </Button>
                <h3 className='FolderPage__folder-name'>
                {currNote && currNote.name}
                </h3>
            </div>
        )
    }
}



export default FolderPage; 
