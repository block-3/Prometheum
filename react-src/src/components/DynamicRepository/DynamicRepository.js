import React, { Component } from 'react';
import Repositories from '../Repositories/Repositories';
import gitlab from '../../config/gitlab.js';

class DynamicRepository extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      repos: [],
      starred_repos: props.starred_repos
    }
    this.renderRepos = this.renderRepos.bind(this);
    this.renderRepos();
  }

  componentWillReceiveProps(nextProps){
    alert('d')
    this.setState({'starred_repos': nextProps.starred_repos})
    this.renderRepos();
  }

  renderRepos(){
    this.props.gitlab_promise.then(repos => {
    let holdR = repos.map(repo =>
      <Repositories
      key={repo.id}
      repoID={repo.id} repoName={repo.name} user={repo.owner.username}
      src="0" src_usd="0" stars={repo.star_count}
      handleStar={this.props.handleStar}/ >);
    this.setState({repos: holdR});
  });
  }


    render(){
      return(
      <div>
        {this.state.repos}
      </div>);
    }
  }


export default DynamicRepository;
