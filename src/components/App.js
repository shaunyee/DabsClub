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
  display: inline-grid;
  grid-template-columns: 250px 250px;

`;

const MainTitleText = styled.p`
  color: #F7C640;
  font-family: 'Permanent Marker', cursive;
  font-weight: bold;
  font-size: 6rem;
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

    return (
        <div className="App">
        <div>
          <MainTitle>
            <MainTitleText className="main-title">Dabs</MainTitleText> <MainTitleText className="main-title">Club</MainTitleText>
          </MainTitle>
                  <img src={`${NBALogoUrl}`} alt=""/>
          </div>
        </div>
    );
  }
}

export default App;
