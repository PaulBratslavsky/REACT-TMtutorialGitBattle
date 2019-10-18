import React, { Component } from 'react';
import { battle } from './../utilities/api';
import Card from './Card';
import ProfileList from './ProfileList';
import PropTypes from 'prop-types';
import Loading from './Loading';
import queryString from 'query-string';
import { Link } from 'react-router-dom';


export default class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }
  componentDidMount() {
    const { playerOne, playerTwo } = queryString.parse(this.props.location.search);

    console.log(queryString.parse(this.props.location.search), "WHERE");

    battle([playerOne, playerTwo]).then((players) => {
      this.setState({
        winner: players[0],
        loser: players[1],
        error: null,
        loading: false
      });
    }).catch(({ message }) => {
      this.setState({
        error: message,
        loading: false
      });
    });
  }
  render() {

    const { winner, loser, error, loading } = this.state;

    if (loading) {
      return (
        <Loading text='Loading' speed={200}/>
      );
    } else if (error) {
      return (
        <h2 className="error center-text">{error}</h2>
      )
    } else {
      return (
        <React.Fragment>
        <div className="grid space-around container-sm">
          <Card
            header={winner.score === loser.score ? 'Tie' : 'Winner'}
            subheader={`Score: ${winner.score.toLocaleString()}`}
            avatar={`Avatar for ${winner.profile.login}`}
            href={winner.profile.avatar_url}
            name={winner.profile.login}
          >
            <ProfileList profile={winner.profile}/>

          </Card>
            

          <Card
            header={winner.score === loser.score ? 'Tie' : 'Loser'}
            subheader={`Score: ${loser.score.toLocaleString()}`}
            avatar={`Avatar for ${loser.profile.login}`}
            href={loser.profile.avatar_url}
            name={loser.profile.login}
          >
            <ProfileList profile={loser.profile} />

        </Card>
        </div>
          <Link 
            className="btn dark-btn btn-space"
            to="/battle"
          > 
            RESET BATTLE
          </Link>
        </React.Fragment>
      )
    }

  }
}


