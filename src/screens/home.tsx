import { StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../constants/colors';
import Card from '../components/card';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

type RootStackParamList = {
  Home: undefined;
  Call: { code: string };
};

const Home: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>('');

  const generateCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
  };

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  const handleCreateMeeting = (): void => {
    const generatedCode = generateCode();
    setCode(generatedCode);
    toggleModal();
  };

  const handleCopyCode = (): void => {
    Clipboard.setString(code); // Copies the code to clipboard
  };

  const handleOk = (): void => {
    toggleModal();
    navigation.navigate('Call', { code }); // Navigates to Call page
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/1.png')} style={styles.image} />
      <Card />
      {/* Button Container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleCreateMeeting}>
          <Text style={{ color: 'black' }}>Create a Meeting</Text>
        </TouchableOpacity>
      </View>
      
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Meeting Code</Text>
            <Text style={styles.modalText}>Your meeting code is: {code}</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={handleCopyCode}>
                <Text style={{ color: 'black' }}>Copy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
                <Text style={{ color: 'black' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleOk}>
                <Text style={{ color: 'black' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 16,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
    marginHorizontal: 10,
    alignSelf: 'center'
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 16,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: Colors.blue,
    padding: 16,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.textblack,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.textblack,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
});
