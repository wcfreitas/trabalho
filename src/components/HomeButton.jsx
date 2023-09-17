import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const HomeButton = ({title, onPressButton}) => {
    
    const style = StyleSheet.create({
        button: {
            marginVertical: 10,
            marginHorizontal: 3,
            paddingVertical: 6,
            borderRadius: 30,
            borderWidth: 1,
            height: 40,
            width: 120,
            backgroundColor: '#FAA138',
            alignItems: 'center',
        },
        textButton: {
            color: '#000',
            fontSize: 16
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

export default HomeButton;