import Axios from 'axios';
import React, { useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react'
import {useState} from 'react';
import './Dashboard.css';
import axios from 'axios';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import Posts from '../components/Posts'

const Dashboard = (props) => {
    const [numPosts, setNumPosts] = useState(0);
    const [posts, setPosts] = useState([]);

    //should use redux soon
    useEffect(() => {
      axios.get('/api/post/posts')
      .then(fetchedposts => {
          console.log(fetchedposts.data)
          return fetchedposts.data.map(post => ({
              id: post._id,
              title: post.title,
              body: post.body,
              createdAt: post.createdAt
          }))
      })
      .then(allposts => {
          console.log(allposts)
          setPosts(allposts)
          setNumPosts(allposts.length)
      });
  }, [])

    const logout = () => {
        axios.post('/api/auth/logout')
        .then(response => {
            if(response.status == 200) {
                props.history.push('/')
            }
        })
    }

    return (
        <div className="container">
            <div className="mt-4 mb-4 text-center">
                <h2>Welcome Sidharrth.</h2>
                <h3>You have published {numPosts} posts.</h3>
                {/* <h5>Add a new post below.</h5> */}
            </div>
            <div className="row justify-content-center">
                <button className="btn btn-primary mb-4 mr-4" onClick={e => props.history.push('/addpost')}>Add New Post</button>
                <button className="btn btn-primary mb-4" onClick={logout}>Logout</button>
            </div>
            <Posts posts={posts} withEdit={true} />
        </div>
    );
};

export default Dashboard;