import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';

import * as ApiService from '../services/apiservice';
import UserService from '../services/userservice';

import SongList from '../components/songlist';

class PendingRequestsScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      songs: [],
    };
  }

  async componentDidMount() {
    await this.loadPendingRequests();
  }

  loadPendingRequests = async () => {
    this.setState({isLoading: true});

    const authInfo = await UserService.getUserCredentials();

    if (authInfo === null) {
      console.log('authInfo is null!');

      return;
    }

    await UserService.login();

    const result = await ApiService.getPendingRequests(
      authInfo.userId,
      authInfo.sid
    );

    const songs = result.results.map(r => {
      return {...r.song, requestId: r.requestId};
    });

    this.setState({
      isLoading: false,
      songs,
    });
  };

  render() {
    return (
      <SongList
        isLoading={this.state.isLoading}
        noResultsText={'No pending requests'}
        loadData={() => this.loadPendingRequests()}
        results={this.state.songs}
        songsRequested={true}
      />
    );
  }
}

export default withNavigation(PendingRequestsScene);
