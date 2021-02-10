import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Heading from './Heading'
import SearchBar from './SearchBar'
import Posts from './Posts'

const Homepage = () => {
    const [posts, setPosts] = useState([]);
    const [postsToDisplay, setPostsToDisplay] = useState([]);
    useEffect(() => {
      axios.get('/api/post/posts')
      .then(fetchedposts => {
          return fetchedposts.data.map(post => ({
              id: post._id,
              title: post.title,
              body: post.body,
              createdAt: post.createdAt
          }))
      })
      .then(allposts => {
          setPosts(allposts)
          setPostsToDisplay(allposts);
      });
  }, [])
  
  const searchPosts = (keyword = '') => {
    let filteredPosts = posts.filter(post => post.title.includes(keyword) || post.body.includes(keyword))
    setPostsToDisplay(filteredPosts);
  }

    return (
      <div className="mb-5">
        <Heading />
        <SearchBar search={searchPosts}/>
        <Posts posts={postsToDisplay}/>
      </div>
    );
  }
  
  export default Homepage