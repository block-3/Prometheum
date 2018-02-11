import React, { Component } from 'react';
import Repositories from '../Repositories/Repositories';
import gitlab from '../../config/gitlab.js';

class DynamicRepository extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      repos: []
    }
    this.updateReact = this.updateReact.bind(this);
    this.handleStar = this.handleStar.bind(this);
  }

  handleStar(){
    alert('Calling from grandpa list');
  }
  updateReact(){

    let projects_promise = gitlab.projects.all().then( function(s,r){
      if(!r){
        return s;}});
    projects_promise.then( s => {
        let reposNum = s.length;
        let hold=[];
        for(let i=0; i<reposNum;i++){

            let user = s[i].owner.name;

            let repoName = s[i].namespace.name;

            let src=0;
            let src_usd=0;
            let stars=0;
            hold[i] =
            <Repositories user={user} repoName={repoName} src={src} src_usd={src_usd} stars={stars} handleStar={this.handleStar} / >;
         }
         this.setState({repos: hold});
      });

  }


    render(){
      this.updateReact();
      //let hold = <Repositories user='2s' repoName='john' src='1' src_usd='3' stars='0' handleStar={this.handleStar} / >//this.updateReact();
      //this.setState({repos: hold})
      return(
      <div>
        {this.state.repos}
      </div>);
    }
  }


export default DynamicRepository;
