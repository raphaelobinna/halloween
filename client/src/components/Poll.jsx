import React from 'react';
import {connect} from 'react-redux'
import {ProgressBar} from 'react-bootstrap'


import {vote} from '../store/actions';
import DefaultUserPic from '../uploads/team-male.jpg';

const Poll = ({poll, vote}) => {

    let appURI = null

    if (process.env.NODE_ENV === "production"){
        appURI = process.env.REACT_APP_URL_PRODUCTION
    } else {
        appURI = process.env.REACT_APP_URL_DEVELOPMENT
    }

    const answers = poll.options  && poll.options.map(option => (
        <button 
            onClick={() => vote(poll._id, {answer: option.option})} 
            className="button"
            key={option._id}> 
                {option.option} 
        </button>
    ));

    let test = poll.options;

    const fish = (test) => {
      if(!test){
        return null;
      }
    
      return test.map((item,key)=>{

        const V = item.votes
        const totalVote = item &&  poll.voted.length
        const now = (V / totalVote * 100).toFixed();
        return (
            <div key={item._id} >
                <h4> {item.option} </h4>
                <ProgressBar animated now={now} label={`${now}%`} />
            </div>
          
        );
      })
    }
    
    console.log(fish(test));

if ( poll.options ) {
    const pollImage = () => {

        let pollArray = poll.options
        let fish = 0;
        let cat;
        for (const element of pollArray ) {
        
          if (element.votes > fish){
            // console.log(element);
            fish = element.votes;
            cat = element.option;
          }
        }
      
        return cat;
      }
      
      console.log('answer',pollImage())

    } 
        
            //picture display configuration
            let heroPic = DefaultUserPic;
           
        //     if((total > totalb) || (total > totalc) || ( total > totald)){
        //         heroPic = `${appURI}/uploads/DeadPool.JPG`
        //     } 
        //     if((totalb > total) || (totalb > totalc) || (totalb > totald)) {
        //         heroPic = `${appURI}/uploads/Hulk.JPG`
        //     }
        //     if((totalc > total) || (totalc > totalb) || (totalc > totald)) {
        //         heroPic = `${appURI}/uploads/strange.JPG`
        //     } 
        //     if((totald > total) || (totald > totalb) || (totald > totalc) ){
        //         heroPic = `${appURI}/uploads/Iron.JPG`
        //    }
         //user image logic
          var profilePic=`${appURI}/${poll.image}` ;

         

    return <div>
        <div className="container mt-5" >
            <div className="row" >
                <div className="col" >
                    <div className="d-flex justify-content-center">
                <img  className="picture float mr-5" src={profilePic} alt="profils pic" />
                <img  className="picture float right" src={heroPic} alt="profils pic" />
                </div>
                <div className="clearfix"></div>
                </div>
            </div>
        </div>
        <div className="clearfix"></div>
        <div className="buttons_center" >{answers}</div>
        < div className="poll-box" >
            <div> {fish(test)} </div>
        </div>

      
      
    </div>

}

export default connect(store => ({
    poll: store.currentPoll
}), {vote})(Poll);