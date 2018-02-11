import React, { Component } from 'react';
import { Message, Button, Select } from 'semantic-ui-react';
import {styles} from './RepoFooterStyles';


class RepoFooter extends React.Component{
  render(){
    return(
      <div class= "RepoFooter" style={styles.RepoFooter}>
        <span id="info" style={styles.info}>src: {this.props.src} <b>| </b>
          src_usd: ${this.props.src_usd} <b>|</b> Stars: {this.props.stars}
          <a href="#" onClick={this.props.handleStar} > + </a>
          </span>
      </div>
    )
  }
}

export default RepoFooter;
