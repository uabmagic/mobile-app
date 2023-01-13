import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {withNavigation} from 'react-navigation';

import * as ApiService from '../services/apiservice';

import SongList from '../components/songlist';

import * as Constants from '../util/constants';

class SearchScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      search: '',
    };
  }

  async componentDidMount() {
    await this.search();
  }

  searchChanged = text => {
    this.setState({search: text});
  };

  search = async () => {
    const query = this.state.search;

    if (!query || query.length === 0) {
      return;
    }

    const result = await ApiService.search(query);

    this.setState({results: result.results});
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            autoCorrect={false}
            clearButtonMode={'always'}
            onChangeText={text => this.searchChanged(text)}
            onSubmitEditing={this.search}
            returnKeyType="search"
            placeholder="Enter search..."
            value={this.state.search}
          />
        </View>
        <SongList
          noResultsText={'No results'}
          loadData={() => this.search()}
          results={this.state.results}
          songsRequested={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 50,
    marginRight: 8,
    width: 50,
  },
  noResults: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  searchBox: {
    flex: 0,
    backgroundColor: Constants.colors.UABBlue,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: Constants.colors.white,
    margin: 16,
    padding: 8,
    color: Constants.colors.black,
  },
  subtitle: {
    color: Constants.colors.gray,
    fontSize: 10,
  },
  text: {
    fontFamily: Constants.fonts.slightlyBold,
  },
  title: {
    color: Constants.colors.white,
    fontSize: 14,
  },
});

export default withNavigation(SearchScene);
