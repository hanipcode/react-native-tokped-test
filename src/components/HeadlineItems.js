import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchHeadlines } from '../api';
import Storage from '../storage';
import NewsItem from './NewsItem';

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headlinesText: {
    textAlign: 'right',
    marginRight: 20,
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
});

export default class HeadlineItems extends React.Component {
  static propTypes = {
    page: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      headlineData: [],
      favoritedNews: [],
    };
  }

  componentWillMount() {
    const { page } = this.props;
    fetchHeadlines(page).then(data => this.setState({ headlineData: data.articles }));
  }

  async getFavoritedNews() {
    const favoritedNews = await Storage.asyncGetFavoriteList();
    if (favoritedNews) {
      this.setState({ favoritedNews });
    }
  }

  isInFavoritedNews(url) {
    const { favoritedNews } = this.state;
    const isFound = favoritedNews.findIndex(favoritedUrl => url === favoritedUrl);
    return isFound > -1;
  }

  renderItem({ item, index }) {
    return (
      <NewsItem
        item={item}
        index={index}
        isFavorited={this.isInFavoritedNews(item.url)}
        isHeadline
      />
    );
  }

  render() {
    const { headlineData } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.headlinesText}>Headline News</Text>
        <FlatList
          data={headlineData}
          keyExtractor={item => item.url}
          horizontal
          pointerEvents="auto"
          renderItem={item => this.renderItem(item)}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  }
}
