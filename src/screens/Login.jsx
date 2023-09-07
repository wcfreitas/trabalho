import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, SafeAreaView, ImageBackground, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation(); 

  const handleLogin = () => {
    if (email === "t@t.com" && password === "1") {
      console.log('Login bem-sucedido');
      navigation.navigate('Home');
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
          <Button title={'Entrar'} onPress={handleLogin} />
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

export default Login;
