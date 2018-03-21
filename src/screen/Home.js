import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchNews } from '../api';
import NewsItem from '../components/NewsItem';
import HeadlineItems from '../components/HeadlineItems';
import Storage from '../storage';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newsData: [],
      nextPage: 1,
      refreshing: false,
      favoritedNews: [],
    };
  }

  componentWillMount() {
    this.fetchInitialNews();
    this.getFavoritedNews();
  }

  onRefresh() {
    this.setState({ newsData: [], refreshing: true }, () => {
      this.fetchInitialNews();
    });
  }

  onEndReached() {
    const { nextPage, newsData } = this.state;
    this.setState({ refreshing: true });
    fetchNews(nextPage).then((data) => {
      const nextItem = newsData.concat(data.articles);
      this.setState({ newsData: nextItem, nextPage: nextPage + 1, refreshing: false });
    });
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

  fetchInitialNews() {
    const { nextPage } = this.state;
    this.setState({ refreshing: true });
    fetchNews().then((data) => {
      this.setState({ newsData: data.articles, nextPage: nextPage + 1, refreshing: false });
    });
  }

  renderItem({ item, index }) {
    const { nextPage } = this.state;
    const isShowHeadline = index > 0 && index % 4 === 0;
    return (
      <View>
        <NewsItem item={item} index={index} isFavorited={this.isInFavoritedNews(item.url)} />
        {isShowHeadline && <HeadlineItems page={nextPage} />}
      </View> 
    );
  }

  render() {
    const { newsData, refreshing } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <FlatList
          data={newsData}
          renderItem={data => this.renderItem(data)}
          keyExtractor={item => item.url}
          initialNumToRender={5}
          onEndReached={() => this.onEndReached()}
          onEndReachedThreshold={0.75}
          refreshing={refreshing}
          onRefresh={() => this.onRefresh()}
        />
      </View>
    );
  }
}
