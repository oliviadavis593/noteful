import React, { Component } from 'react';
import config from '../config';
import NoteContext from '../NoteContext';
import './AddFolder.css';

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            }
        }
    }

    static contextType = NoteContext; 

    updateName(name) {
        this.setState({
            name: ({name: {value: name, touched: true}})
        })
    }

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
        .then(() => {
            console.log("Create a folder")
            this.state.addFolder(folderId);

        })
        .catch(error => {
            console.error({ error })
        })

    }
    render() {
          
        return(
            <form className='AddFolder__form'>
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
                        <button 
                        type='submit'
                        className='AddFolder__button'
                        onSubmit={e => this.handleSubmit(e)}
                        >
                            Add folder
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default AddFolder; 