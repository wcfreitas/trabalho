import { ImageBackground, SafeAreaView, Text } from "react-native";

const PriceCards = () => {
    return (
        <SafeAreaView>
            <ImageBackground source={require('../img/PriceBK.jpg')} style={{ width: '100%', height: '100%' }}>
            <Text>Price Cards</Text>
            </ImageBackground>
        </SafeAreaView>
    );
}

export default PriceCards;