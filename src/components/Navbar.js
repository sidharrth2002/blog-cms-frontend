import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    axios.get('/api/post/categories')
    .then(categories => { 
      let categoryNames = categories.data.map(category => {
        return ({
          name: category.name,
          id: category._id
        })
      });
      setCategories(categoryNames);
    }
    )
  }, [])

    return (
        <nav class="navbar navbar-light navbar-expand-lg">
        <Link to="/"><a class="navbar-brand" href="#">Maths for Geeks</a></Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        {
        }
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            {categories.map(category => <Link className="link" to={`/category/${category.id}`}><li key={category.index}>{category.name}</li></Link>)}
          </ul>
          <span class="navbar-text">
            All the Maths Help You Need
          </span>
        </div>
      </nav>
    );
}

export default Navbar;

// {
//   "categories": [
//     {
//       "id": "5f87f4f1f019e7a807079fcd",
//       "name": "the geek blog"
//     },
//     "{id: \"5f87f4f1f019e7a807079fce\", name: \"middle scho…}",
//     "{id: \"5f87f4f1f019e7a807079fcf\", name: \"basic math\"}",
//     "{id: \"5f87f4f2f019e7a807079fd0\", name: \"higher leve…}"
//   ]
// }