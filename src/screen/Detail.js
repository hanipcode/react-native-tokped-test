import React from 'react';
import PropTypes from 'prop-types';
import { WebView, View } from 'react-native';

// const Detail = ({ url }) => (
//   <WebView style={{ flex: 1, backgroundColor: '#FFF' }} javaScriptEnabled source={{ uri: url }} />
// );

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { url } = this.props;
    return (
      <WebView style={{ flex: 1 }} javaScriptEnabled domStorageEnabled source={{ uri: url }} />
    );
  }
}

Detail.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Detail;
