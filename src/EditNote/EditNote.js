import React, { Component } from 'react'
import config from '../config'
import NoteContext from '../NoteContext'
import './EditNote.css'

class EditNote extends Component {

    state = {
        error: null, 
        id: '',
        note_name: '',
        content: ''
    }

    static contextType = NoteContext

    componentDidMount() {
        const note_id = this.props.match.params.note_id
        fetch(`${config.API_ENDPOINT}/api/notes/${note_id}`, {
            method: 'GET',
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))

                return res.json()
        })
        .then(responseData => {
            this.setState({
                id: responseData.id,
                note_name: responseData.note_name, 
                content: responseData.content
            })
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    handleChangeName = e => {
        this.setState({ note_name: e.target.value })
    };

    handleChangeContent = e => {
        this.setState({ content: e.target.value })
    }

    handleSubmit = e => {
        e.preventDefault()
        const { note_id } = this.props.match.params
        const { id, note_name, content} = this.state
        const newNote = { id, note_name, content }
        fetch(`${config.API_ENDPOINT}/api/notes/${note_id}`, {
            method: 'PATCH',
            body: JSON.stringify(newNote),
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => {
            if (!res.ok)
                return res.json().then(error => Promise.reject(error))

                return res.json()
        })
        .then(res => {
            this.resetFields(newNote)
            this.context.updateNote(newNote)
            this.props.histroy.push('/')
        })
        .catch(error => {
            console.error(error)
            this.setState({ error })
        })
    }

    resetFields = (newFields) => {
        this.setState({
            id: newFields.id || '',
            note_name: newFields.note_name || '',
            content: newFields.conetnt || ''
        })
    }

    handleClickCancel = () => {
        this.props.history.push('/')
    }

    render() {
        const { error, note_name, content } = this.state
        return(
            <section className='EditNote'>
                <h2>Edit Note</h2>
                <form
                className='EditNote__form'
                onSubmit={this.handleSubmit}
                >
                    <div className='EditNote__error' role='alert'>
                        { error && <p>{error.message}</p>}
                    </div>
                    <input 
                    type='hidden'
                    name='id'
                    />
                    <div>
                        <label htmlFor='note_name'>
                            Note name
                            {' '}
                        </label>
                        <input 
                            type='text'
                            name='note_name'
                            id='note_name'
                            placeholder='New Note Name'
                            required
                            value={note_name}
                            onChange={this.handleChangeName}
                        />
                    </div>
                    <div>
                        <label htmlFor='content'>
                            Content 
                            {' '}
                        </label>
                        <input 
                            type='text'
                            name='content'
                            id='content'
                            placeholder='New content'
                            required
                            value={content}
                            onChange={this.handleChangeContent} 
                        />
                    </div>
                    <div className='EditNote__buttons'>
                        <button type='button' onClick={this.handleClickCancel}>
                            Cancel
                        </button>
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>
            </section>
        )
    }
}

export default EditNote