import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';
import gitlab from '../../config/gitlab.js';
import DynamicRepository from '../DynamicRepository/DynamicRepository';
import './App.css';

class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
        starred_repos : [],
        repos: [],
        t:''
    };


    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);

  }

  componentDidMount(){
    console.log(this.state.repos);
  }

  updateSRC(new_src){
    this.setState({src: new_src});
  };

  updateSRC_USD(new_src_usd){
    this.setState({src_usd: new_src_usd});
  }



  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].name = user.name;
        users[i].email = user.email;
        users[i].age = user.age;
        users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
    return 'update';
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  render() {
    console.log('rendering');
    gitlab.projects.all().then(r => {
      console.log(r);
    });
    //this.setState({repos: gitlab_promise});
    //get all repos TODO: grab repos by pagation
    //this.state.repos.then(r => {console.log('body');});
    //console.log(gitlab_promise.then(r => (r.map(x =>{ console.log(x.owner.name)}))));
    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <h1 className='App-intro'>Source-The Future of Software Development</h1>
          </div>
        </div>
        <DynamicRepository gitlab_promise = {this.state.repos}  />
        </div>
    );
  }
}

export default App;
