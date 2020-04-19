import React, { Component} from 'react';
import { Link } from 'react-router-dom'
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
        console.log("note_id", note_id)
        const note = notes.find(note => note.id === parseInt(note_id));
        console.log("note", note)
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
                {/*note ? folders.find(folder => folder.id === parseInt(note_id, 10)).folder_name : ' '*/}
                </h3>
                <div className='Note__edit'>
                    <Link to={`/edit/${folders.id}`}>Edit</Link>
                </div>
            </div>
        )
    }
}



export default FolderPage; 