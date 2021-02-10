import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';
import moment from 'moment';
import './CKEditorStyle.css';

const PostPage = (match) => {
    const [post, setPost] = useState({post: []})
    const [postid, setPostid] = useState('')
    const [formattedDate, setDate] = useState()
    useEffect(() => {
        axios.get(`/api/post/${match.match.params.id}`)
        .then((postData) => {
            return {
                id: postData.data._id,
                title: postData.data.title,
                body: postData.data.body,
                createdAt: postData.data.createdAt
            }
        })
        .then((postData) => setPost({post: postData}))
        .then(() => setDate(moment(post.post.createdAt).format('YYYY-MM-DD')))
        .catch((err) => console.log(err))
    }, []);

    function createMarkup(html) {
        return {__html: html};
    }

    return (
        <div className="container">
            <div class="jumbotron">
                <h1 class="display-4 text-center mb-3">{post.post.title}</h1>
                <div className="d-flex flex-column text-center mb-5">
                    <h5 className="text-center">By, Sidharrth Nagappan</h5>
                    <p>{formattedDate}</p>
                </div>

                <div className="ck-content postArea" dangerouslySetInnerHTML={createMarkup(post.post.body)}></div>
                <hr class="my-4" />
            </div>
        </div>
    );
};

export default PostPage;

