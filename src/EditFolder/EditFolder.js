import React, { Component } from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import './EditFolder.css'

class EditFolder extends Component {
    
    static contextType = NoteContext;

    state = {
        error: null, 
        id: '',
        folder_name: ''
    }

    componentDidMount() {
        const { folder_id } = this.props.match.params
        fetch(`${config.API_ENDPOINT}/api/folders/${folder_id}`, {
            method: 'GET',
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))

                return res.json()
        })
        .then(responseData => {
            console.log("responseData", responseData)
            this.setState({
                id: responseData.id, 
                folder_name: responseData.folder_name
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
        
    }

    handleChangeFolder = e => {
        this.setState({ folder_name: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { folder_id } = this.props.match.params
        const { id, folder_name } = this.state
        const newFolder = { id, folder_name }
        fetch(`${config.API_ENDPOINT}/api/folders/${folder_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))
        })
        .then(() => {
            this.resetFields(newFolder)
            this.context.updateFolder(newFolder)
            this.props.history.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            folder_name: newFields.folder_name || ''
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error,  folder_name } = this.state
        return(
            <section className='EditFolder'>
                <h2>Edit Folder</h2>
                <form
                className='EditFolder__form'
                onSubmit={this.handleSubmit}
                >
                    <div className='EditFolder__error' role='alert'>
                        {error && <p>{error.message}</p>}
                    </div>
                    <input 
                    type='hidden'
                    name='id'
                    />

                    <div>
                        <label htmlFor='folder_name'>
                            Folder Name
                            {' '}
                        </label>
                        <input 
                            type='text'
                            name='folder_name'
                            id='folder_name'
                            placeholder='New Folder Name'
                            required
                            value={folder_name}
                            onChange={this.handleChangeFolder}
                        />
                    </div>
                    <div className='EditFolder__buttons'>
                        <button type='button' onClick={this.handleClickCancel} className='EditCancel'>
                            Cancel
                        </button>
                            {' '}
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditFolder; 