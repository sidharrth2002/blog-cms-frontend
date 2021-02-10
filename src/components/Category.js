import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from './Posts'

const Category = (props) => {
    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        console.log(props.match.params.id);
        axios.get(`/api/post/category/${props.match.params.id}`)
        .then(fetchedposts => {
            return fetchedposts.data.posts.map(post => ({
                id: post._id,
                title: post.title,
                body: post.body,
                createdAt: post.createdAt
            }))
        })
        .then(allposts => {
            setPosts(allposts);
        });
    }, [props.match.params.id])

    return (
        <div>
        <div className="container jumbotron text-center">
            <h1 className="mt-4">In this category:</h1>
        </div>
        {posts.length == 0 ? 
        <h3 className="text-center">No posts for this category as of yet</h3>
        :
        <Posts posts={posts} />
        }
        </div>
    );
};

export default Category;