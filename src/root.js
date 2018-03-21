import React from 'react';
import { View, Text } from 'react-native';
import { Router, Scene, Modal } from 'react-native-router-flux';
import Home from './screen/Home';
import Detail from './screen/Detail';

const root = () => (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar>
        <Scene key="home" component={Home} hideNavBar={false} title="News Feed" />
      </Scene>
      <Scene key="detail" component={Detail} />
    </Modal>
  </Router>
);

export default root;
