import React, { Component } from 'react';
import { Message, Button, Select } from 'semantic-ui-react';
import axios from 'axios';
import styles from './Repo-Footer.css';


class Repo-Footer extends React.Component{
  render(){
    return(
      <div class=Repo-Footer style={styles}>
        src: {this.props.src} | ${this.props.src_usd} | Stars: {this.props.Stars}
      </div>
    )
  }
}

export Repo-Footer;
