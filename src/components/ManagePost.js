import Axios from 'axios';
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import editorConfiguration from '../config/editorConfiguration'
import { Dropdown, Modal, Button } from 'react-bootstrap';

const ManagePost = (props) => {
    const [postHTML, setPostHTML] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        setPostHTML('<p>Start Typing Your Post here</p>')
        console.log(postHTML)
    }, [])

    const sendPost = () => {
        console.log('Sending to server');
        axios.post('/api/post/createpost', {
            title: title,
            htmlData: postHTML    
        }, {
            withCredentials: true
        })
        .then(response => { 
            if(response.status == 200) {
                setShow(true);
            }
        });
    }

    return (
        <>
        <div class="container mt-5">
            <div className="mb-4">
            {
                postHTML == '<p>Start Typing Your Post here</p>' ? 
                <h1>Add a New Post!</h1>
                :
                <h1>Edit Post</h1>
            }
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label for="title">Title:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setTitle(e.target.value)} type="text"
                    className="form-control" name="" id="title" aria-describedby="helpId" placeholder="" />
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-md-3">
                    <label for="title">Description:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setDescription(e.target.value)} type="text"
            className="form-control" name="description" aria-describedby="helpId" />                
                </div>
            </div>
            <div className="mb-5">
            <Dropdown>
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Category
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Basic Maths</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Middle School Maths</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Higher Level Maths</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            </div>
            <div className="editorArea">
                <CKEditor
                        editor={ Editor }
                        config={ editorConfiguration }
                        data= {postHTML}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setPostHTML(data);
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                    />
                </div>
                <button className="mt-4 btn btn-primary" onClick={sendPost}>Add Post</button>    
        </div>
            <>
      
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Success!</Modal.Title>
              </Modal.Header>
              <Modal.Body>New Post Added Successfully!</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="secondary" onClick={() => props.history.push('/dashboard')}>
                  Dashboard
                </Button>
              </Modal.Footer>
            </Modal>
          </>
          </>
    )
}

export default ManagePost;