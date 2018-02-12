import React, { Component } from 'react';
import {styles} from './RepositoriesStyles';
import RepoFooter from '../RepoFooter/RepoFooter';
import gitlab from '../../config/gitlab.js';
//var express = require('express');
//var app = express();
//import ember-chain from '../../../'

/**
  Update all information with this component and pass src_usd,src and stars to footer
**/

class Repositories extends React.Component{
  constructor(props){
    super(props);

    //list of repos user has starred
    this.state = {
      src_usd: props.src_usd,
      src: props.src,
      stars: props.stars
    }
    this.handleStar=this.handleStar.bind(this);
    this.updateSRC = this.updateSRC.bind(this);
    this.updateSRC_USD = this.updateSRC_USD.bind(this);
    this.updateStars= this.updateStars.bind(this);

  };

  componentWillReceiveProps(nextProps){

    if(nextProps.src_usd!==this.props.src_usd){
      this.updateSRC_USD(nextProps);
    }
    else if(nextProps.src !== this.props.src){
      this.updateSRC(nextProps);
    }
    else if(nextProps.stars !== this.props.stars){
      this.updateStars(nextProps);
    }
    else{console.log('Not sure what to update');}
  }

  updateSRC_USD(nextProps){
    this.setState({'src_usd': nextProps.src_usd});
  };

  updateSRC(nextProps){
  this.setState({'src':nextProps.src});
  }

  updateStars(nextProps){
  this.setState({'stars': nextProps.stars});
  }

  handleStar(id){
    let stars = gitlab.projects.all({'starred':'true'}).then(result => {
      let starred_list = result.map(repo => repo.id);
      let  stard= starred_list.includes(id);

      if(stard){
        gitlab.projects.unstar(id).then((succ,err) =>{if(err){console.log(err)}else{
          console.log("unstarred",succ);
          this.setState({'stars': succ.star_count});
        }});
      }else{
        gitlab.projects.star(id).then((succ,err)=> {if(err){console.log(err)}else{
          console.log("stared",succ);
          this.setState({'stars': succ.star_count});
        }});
      }
    });
  }

  render(){
    return(
    <div className="Repositories" style={styles.Repositories}>
      <span className="info" >
        <text id="repoName" style={styles.info}>{this.props.repoName}</text><br />
        <text id="user" style={styles.user}>{this.props.user}</text>
      </span>
    <RepoFooter id={this.props.repoID}
      src={this.state.src} src_usd ={this.state.src_usd}
      stars={this.state.stars} handleStar= {this.handleStar}/>
    </div>

  );
};
}

export default Repositories;
