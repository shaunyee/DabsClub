import React, { Component } from 'react';
import styled from 'styled-components';
import {schedule} from '../warriorsSchedule';
import {teams} from '../teams';

import Spinner from '../components/UI/Spinner'
import { GET_ALL_USERS } from '../queries';
import Error from '../Utilities/Error';
import '../Styles/buttons.css';
import './App.css';
import {compaireDate} from '../Utilities/formatDate'

const MainTitle = styled.div`
  display: inline;
  padding: 0;
`;

const MainTitleText = styled.span`
  color: #F7C640;
  font-family: 'Permanent Marker', cursive;
  font-weight: bold;
  font-size: 8rem;
  letter-spacing: 2px
 
`;

const MatchUpWrapper = styled.div`
  width: 100%;
  display: block;
  height: 500px;
  img {
    width: 30%;
    vertical-align: middle;
    @media (max-width: 767px) {
    width: 100%;
  }
  }
  div {
  display: inline;
  @media (max-width: 767px) {
    display: block;
  }
  }
`;

const VsSpan = styled.span`
  font-size: 7rem;
  font-weight: 700;
  width: 35%
  vertical-align: middle;
  height: 250px;
  font-family: 'Permanent Marker', cursive;
  color: #FFDD1B;
  -webkit-animation: neon3 1.5s ease-in-out infinite alternate;
  -moz-animation: neon3 1.5s ease-in-out infinite alternate;
  animation: neon3 1.5s ease-in-out infinite alternate;

`;

class App extends Component {
  
  render() {
    const warriorsSchedule = schedule.league.standard;
    const homeGames = warriorsSchedule.filter(games => games.isHomeTeam === true);
    const remainingGames = homeGames.filter(game => compaireDate(game.startDateEastern) >= compaireDate(new Date()))
    const nextOpId = remainingGames[0].vTeam.teamId;
    const allTeams = teams.league.standard;
    const nextOpTeamName = allTeams.filter(team => team.teamId === nextOpId);
    const triCode = nextOpTeamName[0].tricode.toLocaleLowerCase();

    
    const NBALogoUrl = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/${triCode}.png`
    const warriorsLogo = `https://www.nba.com/.element/img/1.0/teamsites/logos/teamlogos_500x500/gsw.png`


    return (
        <div className="App">
        <div>
          <MainTitle>
           <p><MainTitleText className="main-title">Dabs</MainTitleText> <MainTitleText className="main-title">Club</MainTitleText></p>
          </MainTitle>
          <br />
            <span>Next Game</span>
            <MatchUpWrapper>
                <div>
                  <img src={`${NBALogoUrl}`} alt=""/>
                  <VsSpan>Vs</VsSpan>
                  <img src={warriorsLogo} alt=""/>
                </div>
          </MatchUpWrapper>
          </div>
        </div>
    );
  }
}

export default App;
