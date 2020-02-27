import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
import './AddFolder.css';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    static contextType = NoteContext; 

    updateName(name) {
        this.setState({
            name: ({name: {value: name, touched: true}})
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const newFolder =  {
            name: this.state.name
        }
        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: new Headers ({
                'content-type': 'application/json'
            }),
            body: JSON.stringify(newFolder)
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))
                return response.json()
        })
        .then(data => {
            this.context.addFolder(data)
        })
        .catch(error => {
            console.error({ error })
        }) 
    }

    
    render() {
          
        return(
            <form 
            className='AddFolder__form'
            onSubmit={(e) => {this.handleSubmit(e); this.props.history.push('/')}}
            >
                <h2>Create a folder</h2>
                <div className='AddFolder__container'>
                    <label htmlFor='name'>
                        Name
                    </label>
                    <input 
                    type='text'
                    name='name'
                    id='name-input'
                    required
                    onChange={e => this.updateName(e.target.value)}
                    />
                    <div className='AddFolder__button-container'>
                        <button type='submit'>
                            Add Folder
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddFolder; 

/*

handleSubmit = e => {
        e.preventDefault();
        const folderId = this.props.id; 

        fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(response => {
            if(!response.ok)
                return response.json().then(e => Promise.reject(e))

                return response.json()
        })
        .then(data => {
            this.context.addFolder(data)
        })
        .catch(error => {
            console.error({ error })
        })

    }
 */