import React, { Component } from 'react';
import { Message, Button, Select } from 'semantic-ui-react';
import axios from 'axios';
//import {styles} from './RepoFooterStyles';


class RepoFooter extends React.Component{
  render(){
    return(
      <div class= "RepoFooter" > 
        src: {this.props.src} | ${this.props.src_usd} | Stars: {this.props.Stars}
      </div>
    )
  }
}

export default RepoFooter;
