import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LoginButton = ({title, onPressButton}) => {
    
    const style = StyleSheet.create({
        button: {
            margin: 10,
            paddingVertical: 6,
            borderRadius: 30,
            borderWidth: 1,
            height: 40,
            width: 200,
            backgroundColor: '#130c23',
            alignItems: 'center',
        },
        textButton: {
            color: 'white',
            fontSize: 18
        }
    })

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={onPressButton}>
        <View style={style.button}>
            <Text style={style.textButton}>{title}</Text>
        </View>
    </TouchableOpacity>
  );
}

export default LoginButton;