import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '../Button/Button';
import NoteContext from '../NoteContext';
import './FolderList.css'

class FolderList extends Component {

    static contextType = NoteContext; 

    render() {
        const  folders  = this.context.folders;
        return(
            <div className='FolderList'>
                <ul className='FolderList__list'>
                    {folders.map(folder => 
                        <NavLink 
                        key={folder.id} 
                        to={`/folders/${folder.id}`}
                        className='FolderList__folder-link'
                        >
                            <li>{folder.folder_name}</li>
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
                        
                        <br />
                        Folder
                    </Button>
                </div>
            </div>
        )
    }
}

export default FolderList; 

