import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
//import ValidationError from '../ValidationError';
import './AddNote.css';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
    };
  }

  static contextType = NoteContext;

  handleAddNote(event) {
    event.preventDefault();
    const modified = new Date();
    const newNote = {...this.state.note, modified}
    if(this.state.note && this.state.note.name && this.state.note.content_name) {
      let options = {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body:JSON.stringify(newNote),
      };
      console.log(options);
     fetch(`${config.API_ENDPOINT}/api/notes`, options)
        .then(response => {
          if (!response.ok) return response.json().then(e => Promise.reject(e));
          //return response.json();
        })
        .then(data => {
          console.log(data);
          this.context.addNote(data);
          
        })
        .catch(error => {
          console.error({ error });
        });
      }
      else {
        alert('You must enter text for both note name and content')
      }
    }
    

  handleChange = event => {
    this.setState({
      note: {
        ...this.state.note,
        [event.target.name]: event.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <form
          onSubmit={e => {
            this.handleAddNote(e);
            this.props.history.push(`/api/folders/${this.state.note.folder_id}`);
            
          }}
          className='AddNote__form'
        >
          <h2>Create a note</h2>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input 
            type="text" 
            name="name" 
            id="note-name-input" 
            onChange={this.handleChange} 
            />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea 
            name="content_name" 
            id="note-content-input" 
            onChange={this.handleChange} 
            />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select name="folderId" id="note-folder-select" onChange={this.handleChange}>
              {this.context.folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.folder_name}
                </option>
              ))}
            </select>
          </div>
          <div className="AddNote__button-container">
            <button 
            type="submit" 
            className="AddNote__button"
            >
              Add Note
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddNote;


/*
 fetch(`${config.API_ENDPOINT}/api/notes`, {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json',
        }),
        body: JSON.stringify(newNote),
      })
*/