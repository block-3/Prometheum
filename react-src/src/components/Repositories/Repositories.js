import React, { Component } from 'react';
import { Message, Button, } from 'semantic-ui-react';
import axios from 'axios';
import {styles} from './RepositoriesStyles';
import RepoFooter from '../RepoFooter/RepoFooter'
//import ember-chain from '../../../'

/**
  Update all information with this component and pass src_usd,src and stars to footer
**/

class Repositories extends React.Component{
  constructor(props){
    super(props);
    this.state={
      user: "test",
      repoName: "test name"
    };
    this.props={
      stars: 0,
      src: 0,
      src_usd:0,
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
        <text id="user" style={styles.user}>{this.state.user}</text><br />
        <text id="repoName" style={styles.info}>{this.state.repoName}</text>
      </span>
    <RepoFooter src="100" src_usd ="321" stars="80"/>
    </div>

  );
};
}

export default Repositories;
