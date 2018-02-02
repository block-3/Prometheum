import React, { Component } from 'react';
import { Message, Button, } from 'semantic-ui-react';
import axios from 'axios';
import styles from './Repositories.css';
import Repo-Footer from 'Repo-Footer'

/**
  Update all information with this component and pass src_usd,src and stars to footer
**/

class Repository extends React.Component{
  constructor(props){
    super(props);
    this.state{
      stars: undefined,
      src: 0,
      src_usd:0,
      user: undefined,
      repoName: undefined
    }
  }

  //grabs updates on stars and src raised
  componentWillRecieveProps(nextProps){
    //Updates if there's a change in purchase power of src_usd
    if(this.props.src_usd!==nextProps.src_usd) {
      updateSRC_USD(nextProps.src_usd);
    }

    //Updates if src raised changes
    if(this.props.src !== nextProps.src){
      updateSRC(nextProps.src);
    }
  }

  updateSRC(new_src){
    this.setState(src: new_src);
  }

  updateSRC_USD(new_src_usd){
    this.setState({src_usd: new_src_usd});
  }

  render({
    <div class=Repositories>
      
      <React-Footer />
    </div>
  });
}
