import React, { Component } from 'react';
import { Query, Subscription } from 'react-apollo';
import styled from 'styled-components';

import { FEED_QUERY, FEED_SUBSCRIPTION } from '../../queries';
import Error from '../../Utilities/Error';
import Spinner from '../UI/Spinner';

const FeedCard = styled.div`
    display: inline-block;
	align-items: center;
	justify-content: center;
	width: 60%;
	height: calc(50% - 20px);
	margin: 10px;
	background-color: #DEE0E5;
    border: 2px solid #f7c640;
    border-left: 30px solid #006BB8;
    p {
        color: black;
        font-size: 1rem;
        margin: 10px
    }
`;
const CardWrapper = styled.div`
    position: relative;
    display: flex;

`;

class Feed extends Component {
  render() {
    return (
        <Subscription subscription={FEED_SUBSCRIPTION}>
            {({ data}) => (
        <Query query={ FEED_QUERY }>
            {({ data, loading, error, subscribeToMore }) => {
                if(loading) return <Spinner />
                if(error) return <Error error={ error } />
                const { allFeeds } = data;
                subscribeToMore({
                document: FEED_QUERY,
                updateQuery: (prev, { subscriptionData }) => {
                    if(!subscriptionData.data) return prev;
                    const newFeed = subscriptionData.data.allFeeds
                    return {
                        allFeeds: newFeed
                    }
                 }
                })
                    return (
                        <div className="App">
                        <h1>News Feed</h1>
                        {allFeeds.map(feed => {
                            if(feed.type === 'Price') {
                                return(
                                <CardWrapper key={feed.id}>
                                <FeedCard>
                                    <p>{feed.fromUser} has Uptated Price/Status</p> 
                                <p>{feed.fromOpponent} {feed.fromDate}</p>
                                    <p>Price: ${feed.price} and Status: {feed.gameStatus}</p>
                                </FeedCard>
                                </CardWrapper>
                                )
                            }
                            if(feed.type === 'New Trade') {
                            return (
                                <CardWrapper key={feed.id}>
                                <FeedCard>
                                    <p>{feed.fromUser} has Requested a Trade to {feed.toUser}</p> 
                                <p>{feed.fromOpponent} {feed.fromDate}</p>
                                <p> for</p>
                                    <p>{feed.toOpponent} {feed.toDate}</p>
                                </FeedCard>
                                </CardWrapper>
                            )}
                            if(feed.type === 'Accept Trade') {
                            return (
                                <CardWrapper key={feed.id}>
                                <FeedCard>
                                    <p>{feed.toUser} has Accepted a Trade from {feed.fromUser}</p> 
                                <p>{feed.fromOpponent} {feed.fromDate}</p>
                                <p> for</p>
                                    <p>{feed.toOpponent} {feed.toDate}</p>
                                </FeedCard>
                                </CardWrapper>
                            )}
                            if(feed.type === 'Reject Trade') {
                            return (
                                <CardWrapper key={feed.id}>
                                <FeedCard>
                                    <p>Trade has been Canceled between {feed.toUser} and {feed.fromUser}</p> 
                                <p>{feed.fromOpponent} {feed.fromDate}</p>
                                <p> for</p>
                                    <p>{feed.toOpponent} {feed.toDate}</p>
                                </FeedCard>
                                </CardWrapper>
                            )}
                            })}
                        </div>
                    )}}
        </Query>
            )}
        </Subscription>
    )
  }
}
export default Feed;