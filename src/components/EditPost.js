import Axios from 'axios';
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import editorConfiguration from '../config/editorConfiguration'
import moment from 'moment' 

function EditPost(props) {
    const [postID, setPostID] = useState('')
    const [postHTML, setPostHTML] = useState('');
    const [description, setDescription] = useState('');
    const [title, setTitle] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [date, setDate] = useState();

    useEffect(() => {
        axios.get(`/api/post/${props.match.params.id}`)
        .then((postData) => {
            setPostHTML(postData.data.body);
            setTitle(postData.data.title);
            setPostID(postData.data._id);
        })
        .catch((err) => console.log(err))
    }, []);

    const updatePost = () => {
        axios.post(`/api/post/updatepost`, {
            _id: postID,
            title: title,
            postHTML: postHTML
        }, {
            withCredentials: true
        })
        .then(response => {
            if(response.status == 200) {
                props.history.push('/dashboard')
            } else {
                console.log('Something went wrong');
            }
        })
    }
    
    if(redirect) {
        props.history.push('/dashboard');
    }

    return (
        <div class="container mt-5">
            {
                postHTML == '<p>Start Typing Your Post here</p>' ? 
                <h1>Add a New Post!</h1>
                :
                <h1>Edit Post</h1>
            }
            <div className="row mb-4">
                <div className="col-md-3">
                    <label for="title">Title:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setTitle(e.target.value)} type="text"
                    className="form-control" name="" id="title" aria-describedby="helpId" placeholder="" value={title}/>
                </div>
            </div>
            <div className="row mb-5">
                <div className="col-md-3">
                    <label for="title">Description:</label>
                </div>
                <div className="col-md-9">
                <input onChange={(e) => setDescription(e.target.value)} type="text"
            className="form-control" name="description" aria-describedby="helpId" />                
                </div>
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
                <button className="mt-4 btn btn-primary" onClick={updatePost}>Update</button>    
        </div>
    )
}

export default EditPost;