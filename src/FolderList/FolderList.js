import React from 'react';
import STORE from '../store'
import { Link } from 'react-router-dom';

function FolderList() {
    return(
        <section>
            <ul>
                {STORE.folders.map(folder =>
                <li key={folder.id}>
                    <Link to={`/folder/${folder.id}`}>
                        {folder.name}
                    </Link>
                </li>    
                )}
            </ul>
        </section>
    )
}

export default FolderList; 