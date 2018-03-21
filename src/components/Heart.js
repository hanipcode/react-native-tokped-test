import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Storage from '../storage';

const HEART_OUTLINE = require('../assets/like_outline.png');
const HEART_FILL = require('../assets/like.png');

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});

export default class Heart extends React.Component {
  static propTypes = {
    isFavorited: PropTypes.bool.isRequired,
    onFavoriteItem: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      imageScale: new Animated.Value(1),
      isFavorited: props.isFavorited,
    };
  }

  onHeartPress() {
    const { imageScale, isFavorited } = this.state;
    const { onFavoriteItem } = this.props;
    requestAnimationFrame(() => {
      Animated.sequence([
        Animated.spring(imageScale, {
          friction: 2,
          tension: 40,
          toValue: 1.5,
          useNativeDriver: true,
        }),
        Animated.timing(imageScale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      // trying optimistic rendering so user doesnt have item to be saved
      this.setState({ isFavorited: !isFavorited });
      onFavoriteItem();
    });
  }

  render() {
    const { imageScale, isFavorited } = this.state;
    return (
      <Animated.View style={{ transform: [{ scale: imageScale }] }}>
        <TouchableOpacity onPress={() => this.onHeartPress()}>
          <Animated.Image source={isFavorited ? HEART_FILL : HEART_OUTLINE} style={styles.image} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
