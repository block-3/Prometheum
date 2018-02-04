import React, { Component } from 'react';
import { Message, Button, } from 'semantic-ui-react';
import axios from 'axios';
//import styles from './RepositoriesStyles';
import RepoFooter from '../RepoFooter/RepoFooter'

/**
  Update all information with this component and pass src_usd,src and stars to footer
**/

class Repositories extends React.Component{
  constructor(props){
    super(props);
    this.state={
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
    <div>
      <RepoFooter />
    </div>
  );
};
}

export default Repositories;
