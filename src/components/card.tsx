import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import Colors from '../constants/colors';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Call: { code: string };
};

const Card: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (code.length !== 6) {
      setError('Please enter a valid 6-digit code.');
    } else {
      setError('');
      navigation.navigate('Call', { code });
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Enter the code"
          style={[styles.input, error ? styles.errorBorder : null]}
          placeholderTextColor={Colors.textblack}
          onChangeText={(text) => setCode(text)}
          value={code}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleJoin}
        accessibilityLabel="Join Call Button"
      >
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    color: Colors.textblack,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 10,
    width: '30%',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  errorBorder: {
    borderColor: 'red',
  },
});
