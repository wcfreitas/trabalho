import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, ImageBackground, View } from 'react-native';
import LoginButton from '../components/LoginButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === "trabalho@trabalho.com" && password === "123456") {
      console.log('Login bem-sucedido');
    } else {
      console.log('Login inválido');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <ImageBackground
        source={require('../img/fundo.jpg')}
        style={styles.backgroundImage}
      >
        <Text style={styles.title}>Bem Vindo ao YugiApp Cards</Text>
        <View style={styles.ViewCenter}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            textContentType='emailAddress'
            placeholderTextColor={'black'}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
            textContentType='password'
            placeholderTextColor={'black'}
          />
          <LoginButton title={'Entrar'} onPressButton={handleLogin} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  title: {
    borderRadius: 10,
    marginTop: 60,
    padding: 5,
    paddingHorizontal: 20,
    fontSize: 46,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
  },
  ViewCenter: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default LoginScreen;
