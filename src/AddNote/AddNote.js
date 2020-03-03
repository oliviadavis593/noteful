import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
import ValidationError from '../ValidationError';
import './AddNote.css';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        value: '',
        touched: false
      },
    };
  }

  static contextType = NoteContext;

  handleAddNote(event) {
    event.preventDefault();
    const modified = new Date();
    const newNote = {...this.state.note, modified,}
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(newNote),
    })
      .then(response => {
        if (!response.ok) return response.json().then(e => Promise.reject(e));
        return response.json();
      })
      .then(data => {
        console.log(data);
        this.context.addNote(data);
        
      })
      .catch(error => {
        console.error({ error });
      });
    }

  handleChange = event => {
    this.setState({
      note: {
        ...this.state.note,
        [event.target.name]: event.target.value,
      },
    });
  };

  updateForm(note) {
    this.setState({note: {value: note, touched: true}})
  }


  render() {
    return (
      <>
        <form
          onSubmit={e => {
            this.handleAddNote(e);
            this.props.history.push(`/folder/${this.state.note.folderId}`);
            
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
            {this.state.name.touched && (
            <ValidationError message={this.validateForm()} />
          )}
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea 
            name="content" 
            id="note-content-input" 
            onChange={this.handleChange} 
            />
            {this.state.name.touched && (
            <ValidationError message={this.validateForm()} />
          )}
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select name="folderId" id="note-folder-select" onChange={this.handleChange}>
              {this.context.folders.map(folder => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>
          <div className="AddNote__button-container">
            <button 
            type="submit" 
            className="AddNote__button"
            disabled={this.validateForm()}
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


