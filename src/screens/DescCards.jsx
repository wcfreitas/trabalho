import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Animated, StyleSheet, ImageBackground } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';

const DescCards = ({ route }) => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const fetchCardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${route.params.id}`);
      const jsonData = response.data;
      setCardData(jsonData.data);
    } catch (error) {
      console.log('Ocorreu um erro:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const animatedValue = new Animated.Value(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipImageAnimation = () => {
    if (isFlipped) {
      Animated.spring(animatedValue, {
        toValue: 0,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 180,
        tension: 10,
        friction: 8,
        useNativeDriver: true,
      }).start(() => {
        // Após a animação, altere o estado para refletir a posição atual
        setIsFlipped(!isFlipped);
      });
    }
  };

  const setInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const rotateYAnimatedStyle = {
    transform: [{ rotateY: setInterpolate }],
  };

  return (
    <SafeAreaView style={style.containerSafe}>
      <ImageBackground
        source={require('../img/BackgroundHome.webp')}
        style={style.imageBG}
      >
        {loading ? (
          <View style={style.loading}>
            <Text style={style.textLoading}>Loading...</Text>
            <ActivityIndicator size="large" color="#c73709" />
          </View>
        ) : (
          <View>
            <Text>Name: {cardData.name}</Text>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  imageBG: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  containerSafe: {
    flex: 1,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    margin: 50,
  },
  textLoading: {
    color: '#c73709',
    textAlign: 'center',
    fontSize: 50,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  cardContainer: {
    // Estilize o contêiner do cartão aqui
  },
})

export default DescCards;
