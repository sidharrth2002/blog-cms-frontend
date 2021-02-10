import React, { useState } from 'react';
import { convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const RichTextEditor = () => {
    const [editorState, setEditorState] = useState("");
    
    function onEditorStateChange(editorState) {
        setEditorState(editorState);

        const rawData = convertToRaw(editorState.getCurrentContent());
    }

    function handleClick(e) {
        console.log(convertToRaw(editorState.getCurrentContent())['blocks'][0]['text']);
    }

    return (
        <React.Fragment>
        <Editor 
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange} />
        <button onClick={handleClick} className="btn btn-primary">Done</button>
        </React.Fragment>
    ); 
};

export default RichTextEditor;