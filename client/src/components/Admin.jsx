import Axios from 'axios';
import React, { Component, Fragment } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';

import DefaultUserPic from '../uploads/team-male.jpg';
//import { Redirect } from 'react-router-dom';
import AddHero from './AddHero';
import { getPolls, getUserPolls, deletePoll } from '../store/actions';

let appURI = null

if (process.env.NODE_ENV === "production"){
    appURI = process.env.REACT_APP_URL_PRODUCTION
} else {
    appURI = process.env.REACT_APP_URL_DEVELOPMENT
}

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.showForm = this.showForm.bind(this);
  }
  componentDidMount() {
    const { getPolls } = this.props;
    getPolls();
  }
 
  // adding the id 
  handleSelect(id) {
   console.log('props', this.props)
   //still trying to access individual polls
  }
  handleDelete(id) {
    Axios.delete(`${appURI}/api/poll/${id}`)
        .then(res => {
          console.log(res)
        })
  }

  showForm() {
    this.setState({ submitted: true })
  }

  render() {
    let heroPic = DefaultUserPic;
    const polls = this.props.polls.map(poll => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
         <div className="container" >
        <div className="row">
          <div className="col" >
          <img  className="picture-polls float  mr-5 " src={`${appURI}/${poll.image}`} alt="profils pic" />
          <img  className="picture-polls float right" src={heroPic} alt="profils pic" />
          <div>
            <DeleteIcon style={{ color: "red" }} fontSize="small" onClick={() =>this.handleDelete(poll._id)} key={poll._id} />
          </div>
          
          </div>
          
        </div>
        </div>
        <div className="clearfix"></div>
      </li>
    ));

    return (
      <Fragment>
            <div>
              <ul className="polls">{polls}</ul>
            </div>
            <button onClick={() => this.showForm} >Create Hero</button>

           
              <AddHero/>
      </Fragment>
    );
  }
};

export default connect(
  store => ({
    auth: store.auth,
    polls: store.polls,
  }),
  { getPolls, getUserPolls, deletePoll },
)(Admin);
