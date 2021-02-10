import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }
    componentDidMount() {
      
      axios.get('http://localhost:3001/api/auth/checkToken', {
        withCredentials:true,
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }

    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return <h3>Loading...</h3>
      }
      else if (redirect) {
        return <Redirect to="/login" />;
      }
      return <ComponentToProtect {...this.props} />;
    }
  }
}
