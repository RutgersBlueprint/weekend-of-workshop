import React, { Component, useState } from "react";
import db from './firebase';
import { BrowserRouter as Redirect } from 'react-router-dom';
import styles from './home.module.css'; 
import axios from 'axios';
import Button from '@material-ui/core/Button';

function IsLoggedIn() {
    console.log(db.auth().currentUser);
    return db.auth().currentUser;
}

class CreatePost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: 'Input title here...',
            value: 'Input text here...',
            isSuccess: false,
            buttonText: "Submit"
        };
    }
    handleChangeTitle = (event) => {
        this.setState({title: event.target.value});
    }

    handleChangeBody = (event) => {
        this.setState({value: event.target.value});
    }
    
    handleSubmit = (event) => {
        const article = { title: this.state.title, body: this.state.value};
        axios.post('INSERT URL HERE', article)
            .then(response => this.setState({ isSuccess: true, buttonText: "Submitted" }));
        if(this.state.isSuccess) {console.log("Successfully posted"); this.setState({buttonText: "Submitted"})}
    };

    render() {

        if(localStorage.getItem('uid') == null) {
            return <></>;
        }
        return (
            <div>
                <textarea value={this.state.title} onChange={this.handleChangeTitle}/>
                <textarea value={this.state.value} onChange={this.handleChangeBody}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={styles.submit}
                    onClick={this.handleSubmit}
                >
                    {this.state.buttonText}
                </Button>
            </div>
        );
    }
}


class GetPosts extends Component{
    constructor(props) {
        super(props);
        this.state = {
            jsx: []
        };
    }
    componentDidMount() {
        axios({
            method: 'get',
            url: 'INSERT URL HERE',
            responseType: 'json'
        }).then(response => {
            for(var i = 0; i < response.request.response.length; i++) {
                if(response.request.response[i].createdAt != null) {
                    this.setState({
                        jsx: this.state.jsx.concat(
                            <div key={response.request.response[i].title}>
                                <div className={styles.title}>
                                    <h1>{response.request.response[i].title}</h1>
                                </div>
                                <div className={styles.body}>
                                    <p>{response.request.response[i].body}</p>
                                </div>
                                <div className={styles.timestamp}>
                                    <p>{response.request.response[i].createdAt}</p>
                                </div>
                            </div>
                        )
                    })
                }
            }
        });
    }

    render() {

        return (
            <>
                {this.state.jsx}
            </>
        );
    }
}

class Home extends Component {
    
  render() {
    return (
        <div>
            <div className={styles.navbar}>
                <h1 className={styles.test}>Blueprint Reddit</h1>
                <div className={styles.navLinks}>
                    <p className={styles.navText}><a href="/">Home</a></p>
                    <p className={styles.navText}><a href="/login">Login</a></p>
                    <p className={styles.navTextEnd}><a href="/signup">Signup</a></p>
                </div>
            </div>

            <div className={styles.body}>
                <CreatePost/>
                <GetPosts/>
            </div>
            <div className={styles.footer}>
                
            </div>
        </div>
    );
  }
}

export default Home;
