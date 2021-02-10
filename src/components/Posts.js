import React, { useEffect, useState } from 'react';
import Post from './Post'
import { ModalTitle } from 'react-bootstrap';

const Posts = (props) => {
    return (
        <div className="container">
            <div className="row text-center">
                {props.posts.map(post => {
                    if(props.withEdit) {
                        return <Post key={post.id} data={post} withEdit={true} />
                    } else {
                        return <Post key={post.id} data={post} withEdit={false} />
                    }
                })}
            </div>
        </div>
    );
};

export default Posts;