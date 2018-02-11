import React, { Component } from 'react';
import {styles} from './RepositoriesStyles';
import RepoFooter from '../RepoFooter/RepoFooter'
import gitlab from '../../config/gitlab.js'
//import ember-chain from '../../../'

/**
  Update all information with this component and pass src_usd,src and stars to footer
**/

class Repositories extends React.Component{
  constructor(props){
    super(props);
    this.props={
      stars: 0,
      src: 0,
      src_usd:0,
      user: "",
      repoName: ""
    }
    this.updateSRC= this.updateSRC.bind(this);
    this.updateSRC_USD= this.updateSRC_USD.bind(this);

  };

  updateSRC(new_src){
    this.setState({src: new_src});
  };

  updateSRC_USD(new_src_usd){
    this.setState({src_usd: new_src_usd});
  }

  //grabs updates on stars and src raised
  componentWillRecieveProps(nextProps){
    //Updates if there's a change in purchase power of src_usd
    if(this.props.src_usd!==nextProps.src_usd) {
      this.updateSRC_USD(nextProps.src_usd);
    }

    //Updates if src raised changes
    if(this.props.src !== nextProps.src){
      this.updateSRC(nextProps.src);
    }

  }





  render(){
    return(
    <div class="Repositories" style={styles.Repositories}>
      <span class="info" style={styles.info}>
        <text id="user" style={styles.user}>{this.props.user}</text><br />
        <text id="repoName" style={styles.info}>{this.props.repoName}</text>
      </span>
    <RepoFooter user={this.props.user} repoName= {this.props.username} src={this.props.src} src_usd ={this.props.src_usd} stars={this.props.stars} handleStar= {this.props.handleStar}/>
    </div>

  );
};
}

export default Repositories;
