import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import AnimatedGradient from 'react-native-animated-linear-gradient';

const IMAGE_URI = 'https://source.unsplash.com/random';
const GRADIENT_COLORS = ['hsl(0, 0%, 80%)', 'hsl(0, 0%, 100%)'];

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    height: height / 4,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default class ImageWithLoading extends React.Component {
  static propTypes = {
    imageUri: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      placeholderOpacity: new Animated.Value(1),
    };
  }

  dissolveImage() {
    const { placeholderOpacity } = this.state;
    Animated.timing(placeholderOpacity, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }
  render() {
    const { imageUri } = this.props;
    const { placeholderOpacity } = this.state;

    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: imageUri,
            width: 500,
            height: 300,
          }}
          style={styles.image}
          onLoadEnd={() => this.dissolveImage()}
          resizeMode="cover"
        />
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, opacity: placeholderOpacity }}>
          <AnimatedGradient customColors={GRADIENT_COLORS} speed={400} />
        </Animated.View>
      </View>
    );
  }
}
