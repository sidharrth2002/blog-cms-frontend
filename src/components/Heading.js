import React from 'react';
import { Button } from 'react-bootstrap';

const Heading = () => {
    return (
        <div className="container jumbotron text-center">
            <h1>Sidharrth's Thoughts</h1>
            <h2>Powered by Node.js and MongoDB</h2>
            <h3>Frontend revamped with React.js</h3>
            <Button className="mt-5">Get Started</Button>      
        </div>
    );
};

export default Heading;