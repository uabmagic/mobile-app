import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';

import * as ApiService from '../services/apiservice';
import UserService from '../services/userservice';

import SongList from '../components/songlist';

class FavoritesScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      songs: [],
    };
  }

  async componentDidMount() {
    await this.loadFavorites();
  }

  loadFavorites = async () => {
    this.setState({isLoading: true});

    const authInfo = await UserService.getUserCredentials();

    if (authInfo === null) {
      console.log('authInfo is null!');

      return;
    }

    await UserService.login();

    const result = await ApiService.getFavorites(authInfo.userId, authInfo.sid);

    this.setState({
      isLoading: false,
      songs: result.results,
    });
  };

  render() {
    return (
      <SongList
        isLoading={this.state.isLoading}
        noResultsText={'No favorites'}
        loadData={() => this.loadFavorites()}
        results={this.state.songs}
        songsRequested={false}
      />
    );
  }
}

export default withNavigation(FavoritesScene);
