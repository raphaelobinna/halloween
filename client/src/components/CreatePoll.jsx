import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {Button} from 'react-bootstrap'


import { createPoll } from '../store/actions';
import DefaultUserPic from '../uploads/team-male.jpg';

import axios from 'axios';
import { Redirect } from 'react-router-dom';

let appURI = null

    if (process.env.NODE_ENV === "production"){
        appURI = process.env.REACT_APP_URL_PRODUCTION
    } else {
        appURI = process.env.REACT_APP_URL_DEVELOPMENT
    }


class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFile: '',
      submitted: false,
      profileImage: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();


    this.props.createPoll(this.state);
    this.setState({ submitted: true })
  };
  
  
  UpdateProfileHandler=(e)=>{
        e.preventDefault();

        const formData=new FormData();
    formData.append("pollImage",this.state.uploadedFile);
    //update-profile
    axios.post(`${appURI}/api/poll/upload/`, formData ,{
      headers: {
        "content-type": "application/json"
      }
    }).then(res=>{
       this.setState({profileImage:res.data.image});
    })


    
  
}

  render() {

   // if(this.state.submitted) return <Redirect to="/"/>
    
    if(this.state.profileImage){
      var imagestr=this.state.profileImage;
      var profilePic=`${appURI}/${imagestr}`;
  }else{
       profilePic=DefaultUserPic;
  }

    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <div className="picture" > 
        <img  className="picture" src={profilePic} alt="profils pic" />
        </div>
        <div className="clearfix"></div>
         <label className="form-label" htmlFor="pollImage">
          Poll Image
        </label>
        <input
          className="form-input"
          type="file"
          name="pollImage"
          onChange={(e) => {
            this.setState({uploadedFile: e.target.files[0]}, () => {
              console.log('state', this.state);
            })
            }}required />
            <Button variant="primary" onClick={this.UpdateProfileHandler}>Update Profile</Button>
        <div className="buttons_center">
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default connect(() => ({}), { createPoll })(CreatePoll);
