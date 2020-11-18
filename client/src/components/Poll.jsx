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
        //voting configuration for deadpool
        const V = poll.options &&  poll.options[0].votes
        const totalVote = poll.options &&  poll.voted.length
        const total = totalVote * V / 100

         const now = (V / totalVote * 100).toFixed();

         const progressInstance = <ProgressBar animated now={now} label={`${now}%`} />;

        // voting configuration for Hulk
         const Vb = poll.options &&  poll.options[1].votes
         const totalVoteb = poll.options &&  poll.voted.length
         const totalb = totalVoteb * Vb / 100
 
          const nowb = ( Vb / totalVoteb * 100).toFixed();
 
          const progressInstanceb = <ProgressBar animated now={nowb} label={`${nowb}%`} />;

        // voting configuration for Doctor strange
          const Vc = poll.options &&  poll.options[2].votes
          const totalVotec = poll.options &&  poll.voted.length
          const totalc = totalVotec * Vc / 100
  
           const nowc = ( Vc / totalVotec * 100).toFixed();
  
           const progressInstancec = <ProgressBar animated now={nowc} label={`${nowc}%`} />;

        // voting configuration for iron man
           const Vd = poll.options &&  poll.options[3].votes
           const totalVoted = poll.options &&  poll.voted.length
           const totald = totalVoted * Vd / 100
         
            const nowd = ( Vd / totalVoted * 100).toFixed();
   
            const progressInstanced = <ProgressBar animated now={nowd} label={`${nowd}%`} />;


            //picture display configuration
            let heroPic = DefaultUserPic;
           
            if((total > totalb), (total > totalc), ( total > totald)){
                heroPic = `${appURI}/uploads/DeadPool.JPG`
            } 
            if((totalb > total), (totalb > totalc), (totalb > totald)) {
                heroPic = `${appURI}/uploads/Hulk.JPG`
            }
            if((totalc > total), (totalc > totalb), (totalc > totald)) {
                heroPic = `${appURI}/uploads/strange.JPG`
            } 
            if((totald > total), (totald > totalb), (totald > totalc) ){
                heroPic = `${appURI}/uploads/Iron.JPG`
           }
         //user image logic
          var profilePic=`${appURI}/${poll.image}` ;


    return <div>
        <h3 className="poll-title" >{poll.question}</h3>
        <div className="picture-container">
        <div className="picture float-left" > 
        <img  className="picture" src={profilePic} alt="profils pic" />
        </div>
        <div className="picture float float-right " > 
        <img  className="picture" src={heroPic} alt="profils pic" />
        </div>
        </div>
        <div class="clearfix"></div>
        <div className="buttons_center" >{answers}</div>
        < div className="poll-box" >
            <div > DeadPool {progressInstance} </div>
            <div> Hulk {progressInstanceb}</div>
            <div> Doctor Strange {progressInstancec}</div>
            <div> Iron Man {progressInstanced}</div>      
        </div>
      
    </div>

}

export default connect(store => ({
    poll: store.currentPoll
}), {vote})(Poll);