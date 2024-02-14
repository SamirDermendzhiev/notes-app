import React from 'react';
import { useState } from 'react';
import { NoteCard } from '../note-card/NoteCard';
import { useEffect } from 'react';
import { getMyNotes } from '../../../core/api/notes.api';

const listStyle = {
    display: 'flex',
    flexWrap:'wrap'
}

export function MyNotes(props){
    const[userNotes,setUserNotes] = useState([]);

    useEffect(()=>{
        const searchParam = props.location.search.split('=')[1]
        getMyNotes(searchParam).then((notes)=>{
            setUserNotes(notes);
        });
    },[props.location.search]);

    return(
        <div className="mt-notes-wrapper " style={listStyle}>
            {userNotes.map(note=><NoteCard note={note} key={note.id}/>)}
        </div>
    )
}