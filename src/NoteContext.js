import React from 'react';

const NoteContext = React.createContext({
    notes: [],
    folders: [],
    deleteNote: () => {},
    setNotes: () => {},
    setFolders: () => {}
})

export default NoteContext; 