import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Animated, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import ImageWithLoading from './ImageWithLoading';
import Heart from './Heart';
import Storage from '../storage';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    elevation: 2,
  },
  headlineItemContainer: {
    width: width - 72,
    marginVertical: 8,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 3,
    elevation: 2,
  },
  contentContainer: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  textContainer: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  header: {
    color: '#888',
    fontSize: 14,
    flexWrap: 'wrap',
  },
  sourceName: {
    fontWeight: '600',
  },
  titleText: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  heartContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8,
  },
});

export default class NewsItem extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      author: PropTypes.string,
      description: PropTypes.string,
      publishedAt: PropTypes.string,
      source: PropTypes.shape({
        name: PropTypes.string,
      }),
      title: PropTypes.string,
      url: PropTypes.string,
      urlToImage: PropTypes.string,
    }).isRequired,
    index: PropTypes.number.isRequired,
    isFavorited: PropTypes.bool.isRequired,
    isHeadline: PropTypes.bool,
  };

  static defaultProps = {
    isHeadline: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      itemOpacity: new Animated.Value(0),
    };
  }

  componentWillMount() {
    const { index } = this.props;
    // to use it's modulo by 10 as the index getting bigger and we want to animate item in page
    // which per page have 10 item
    const timingIndex = index % 10 + 1;
    setTimeout(() => this.fadeInItem(), timingIndex * 225);
  }

  onFavoriteItem() {
    const { item } = this.props;
    Storage.asyncSaveFavorite(item.url);
  }

  fadeInItem() {
    const { itemOpacity } = this.state;
    Animated.timing(itemOpacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const { itemOpacity } = this.state;
    const {
      item, index, isFavorited, isHeadline,
    } = this.props;
    const { source, title } = item;
    const { name } = source;

    // sometime returned image doesnt have http but start with //
    // and sometime.. no item.urlToImage
    const imageUri = item.urlToImage ? item.urlToImage.replace(/^\/\//, 'https://') : '';
    
    const excerpt = title.length < 60 ? title : `${title.slice(0, 60)}...`;
    return (
      <TouchableOpacity onPress={() => Actions.detail({ title: excerpt, url: item.url })}>
        <Animated.View
          style={[
            isHeadline ? styles.headlineItemContainer : styles.container,
            {
              opacity: itemOpacity,
            },
          ]}
        >
          <ImageWithLoading imageUri={imageUri} />
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.header}>
                {item.author} from <Text style={styles.sourceName}>{name}</Text>
              </Text>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.heartContainer}>
              <Heart isFavorited={isFavorited} onFavoriteItem={() => this.onFavoriteItem()} />
            </View>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}
