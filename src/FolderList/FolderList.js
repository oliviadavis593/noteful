import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import STORE from '../store'
import Button from '../Button/Button';
import './FolderList.css'

class FolderList extends Component {
    render() {
        return(
            <div className='FolderList'>
                <ul className='FolderList__list'>
                    {STORE.folders.map(folder => 
                        <NavLink 
                        key={folder.id} 
                        to={`/folder/${folder.id}`}
                        className='FolderList__folder-link'
                        >
                            <li>{folder.name}</li>
                        </NavLink>
                    )}
                </ul>
                <div className='FolderList__button-wrapper'>
                    <Button 
                    tag={Link}
                    to='/add-folder'
                    type='button'
                    className='FolderList__add-folder-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
                        Folder
                    </Button>
                </div>
            </div>
        )
    }
}

export default FolderList; 

