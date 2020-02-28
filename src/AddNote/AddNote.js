import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
import './AddNote.css';




class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentFolder: {folder_name: 'Select a folder', id: ''},
            currentFolderNotes: [],
            selectedFolder: {folder_name: 'Select a folder', id: ''},
            folderOptions: [],
            note_name: '',
            content: '',
            folder_id: ''            
        }
    }

    static contextType = NoteContext; 

    

    updateName(note_name) {
        this.setState({note_name})
    }

    updateContent(content) {
        this.setState({content})
    }

    updateFolderId(folder_id) {
        const selectedFolder = this.context.folders.find(folder => folder.id === folder_id);
        this.setState({folder_id, selectedFolder})
    }


    handleAddNote(event) {
        event.preventDefault();
        const newNote = {
            note_name: this.state.note_name,
            folder_id: this.state.folder_id,
            content: this.state.content
        }
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(newNote)
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))
                return response.json()
        })
        .then(data => {
            this.context.addNote(data)
        })
        .catch(error => {
            console.error({error})
        })
    }

    render() {
        
        return(
            <>
            <form onSubmit={(e) => {this.handleAddNote(e); this.props.history.push('/')}}>
                <h2>Create a note</h2>
                <div className='field'>
                    <label htmlFor='note-name-input'>
                        Name
                    </label>
                    <input 
                    type='text'
                    name='name'
                    id='note-name-input'
                    onChange={e => this.updateName(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label htmlFor='note-content-input'>
                        Content
                    </label>
                    <textarea 
                    id='note-content-input'
                    onChange={(e) => this.updateContent(e.target.value)}
                    />
                </div>
                <div className='field'>
                    <label htmlFor='note-folder-select'>
                        Folder
                    </label>
                    <select 
                    id='note-folder-select'
                    onChange={e => this.updateFolderId(e.target.value)}
                    >
                    <option value={this.state.currentFolder.id}>{this.state.currentFolder.folder_name}</option>
                    {this.state.folderOptions.map(folder =>
                        <option key={folder.id} value={folder.id}>
                            {folder.folder_name}
                        </option>    
                    )}
                    </select>
                </div>
                <div className='addNote__button-container'>
                    <button type='submit' className='AddNote__button'>
                        Add Note
                    </button>
                </div>
            </form>
            </>
        )
    }
}

export default AddNote; 


/*
componentWillMount() {
        const currentFolder = this.context.folders.find(folder => 
        `/addNote/folder/${folder.id}` === this.props.location)

        if(currentFolder) {
            const otherFolders = this.context.folders.filter(folder => folder.id !== currentFolder.id)
            this.setState({
                currentFolder,
                folder_id: currentFolder.id,
                folderOptions: otherFolders, 
                selectedFolder: currentFolder,
            });
        } else {
            this.setState({folderOptions: this.context.folders});
        }
    } 
*/