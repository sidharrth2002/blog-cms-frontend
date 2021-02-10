import axios from 'axios';
import React from 'react';
import { FormGroup } from 'react-bootstrap';

function SearchBar(props) {
    return (
        <div className="input-group d-flex justify-content-center">
            <FormGroup className="d-flex align-items-center">
                <label className="mr-4">Search: </label>
                <input className="form-control" name="keyword" onChange={e => props.search(e.target.value)}/>
            </FormGroup>            
        </div>
    );
}

export default SearchBar;