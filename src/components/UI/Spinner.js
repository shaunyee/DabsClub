import React, { Component } from 'react';
import { PacmanLoader } from 'react-spinners';
import styled from 'styled-components';

const Center = styled.div`
    position: relative;
    top: 0;
`;


class Spinner extends Component {
    state = {
        loading: true
    }
    render() {
        return (
    <Center>
        <PacmanLoader
          sizeUnit={"px"}
          size={175}
          color={'#39D1E5'}
          loading={this.state.loading}
        />
      </Center> 
        )
    }
}
export default Spinner;