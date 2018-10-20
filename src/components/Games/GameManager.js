import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateGame from './CreateGame';
import EditGameList from './EditGameList';
import { Redirect } from 'react-router-dom';

const GameManager = props => {
    if(props.session.user.role !== 'ADMIN') {
        return (
            <Redirect to='/' />
        )
    }
  return (
    <div className="App">
     <Tabs>
    <TabList>
      <Tab>Game Creater</Tab>
      <Tab>Game Editor</Tab>
    </TabList>

    <TabPanel>
        <CreateGame /> 
    </TabPanel>
    
    <TabPanel>
        <EditGameList /> 
    </TabPanel>
  </Tabs>
    </div>
  )
}
export default GameManager;