import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
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
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(this.state.note),
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
            <input type="text" name="name" id="note-name-input" onChange={this.handleChange} />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea name="content" id="note-content-input" onChange={this.handleChange} />
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
            <button type="submit" className="AddNote__button">
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
import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
import './AddNote.css';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {},
      validationMessages: {
        name: '',
        content: '',
        folder: ''
      }
    };
  }

  static contextType = NoteContext;

  handleAddNote(event) {
    event.preventDefault();
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify(this.state.note),
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

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false; 
    

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true; 
    } else if (fieldValue.length < 3) {
      fieldErrors.name = 'Name must be at least 3 characters long';
    } else {
      fieldErrors.name = '';
      hasError = false; 
    }
  }

  render() {
    return (
      <>
        <form
          onSubmit={e => {
            this.handleAddNote(e);
            this.props.history.push(`/folder/${this.state.note.folderId}`);
          }}
        >
          <h2>Create a note</h2>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input type="text" name="name" id="note-name-input" onChange={this.handleChange} />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea name="content" id="note-content-input" onChange={this.handleChange} />
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
          <div className="addNote__button-container">
            <button type="submit" className="AddNote__button">
              Add Note
            </button>
          </div>
        </form>
      </>
    );
  }
}

export default AddNote;
*/