import React, { Component } from 'react';
import { Message, Button, Select } from 'semantic-ui-react';
import {styles} from './RepoFooterStyles';


class RepoFooter extends React.Component{
  constructor(props){
    super(props);

  };

  componentWillReceiveProps(nextProps){
    if(nextProps!=this.props){
      alert('foot');
      this.props = nextProps;
    }
  }


  render(){
    return(
      <div className= "RepoFooter" style={styles.RepoFooter}>
        <span style={styles.info}>src: {this.props.src} <b>| </b>
          src_usd: ${this.props.src_usd} <b>|</b> Stars: {this.props.stars}
          <a href="#" onClick={() => this.props.handleStar(this.props.id)} > + </a>
          </span>
      </div>
    )
  }
}

export default RepoFooter;
