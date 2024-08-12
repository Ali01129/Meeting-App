import React from 'react';
import { View, StyleSheet } from 'react-native';
import AgoraUIKit from 'agora-rn-uikit';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  Home: undefined;
};

const Call: React.FC<{ route: any }> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { code } = route.params;

  const connectionData = {
    appId: '2219084667ab46ddb407ecb814a48c0f',
    channel: code,
    token: null,
  };

  const rtcCallbacks = {
    EndCall: () => {
      console.log('Call ended');
      navigation.navigate('Home');
    },
  };

  return (
    <View style={styles.container}>
      <AgoraUIKit connectionData={connectionData} rtcCallbacks={rtcCallbacks} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Call;
