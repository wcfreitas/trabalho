import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView, Text, ActivityIndicator, View, StyleSheet, 
  ImageBackground, Image , TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import { useNavigation } from '@react-navigation/native';

const PriceCards = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const navigation = useNavigation();

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(prevPage => prevPage - 1);
    }
  }

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  }

  const handlePriceButton = () => {
    navigation.navigate('Home');
  }

  const fetchCardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=100&offset=${page * 100}&language=pt`);
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
  }, [page]);

  return (
    <SafeAreaView style={style.containerSafe}>
      <ImageBackground
        source={require('../img/mercador.jpg')}
        style={style.imageBG}
      >
        {loading ? (
          <View style={style.loading}>
            <Text style={style.textLoading}>Loading...</Text>
            <ActivityIndicator size="large" color="#c73709"/>
          </View>
        
      ) : (
        <FlatList
          horizontal={false}
          numColumns={2}
          data={cardData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
              <View style={style.containerCards}>
                  <Animated.Image style={[style.imageCard]} source={{ uri: item.card_images[0].image_url}} />
                  <View style={style.containerTextCards}>
                  <Text style={style.textCards}>Cardmarket Price: ${item.card_prices[0].cardmarket_price}</Text>
                    <Text style={style.textCards}>TCGPlayer Price: ${item.card_prices[0].tcgplayer_price}</Text>
                    <Text style={style.textCards}>eBay Price: ${item.card_prices[0].ebay_price}</Text>
                    <Text style={style.textCards}>Amazon Price: ${item.card_prices[0].amazon_price}</Text>
                    <Text style={style.textCards}>Coolstuffinc Price: ${item.card_prices[0].coolstuffinc_price}</Text>
                  </View>
              </View>
          )}
        />
      )}
      <View style={style.contButtons}>
        {page === 0 ? (
          <HomeButton title={'Next page'} onPressButton={handleNextPage} />
        ) : (
          <>
            <HomeButton title={'Previous page'} onPressButton={handlePrevPage} />
            <HomeButton title={'Next page'} onPressButton={handleNextPage} />
          </>
        )}
        
        <HomeButton title={'Home'} onPressButton={handlePriceButton} />
      </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  imageBG: {
    flex: 1,
    width: '100%',
    alignItems: 'center', 
  },
  imageCard:{
    marginTop: 5,
    width: '90%',
    height: '81%',
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  containerSafe: {
    flex: 1,
  },
  contButtons: {
    flexDirection: 'row',
    alignContent: 'center',
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
  containerCards: {
    width: 180,
    height: 400,
    opacity: 0.8,
    backgroundColor: '#e5a040',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  containerTextCards: {
    marginTop: 4,
    width: 180,
    alignSelf: 'center',
  },
  textCards: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  },
})

export default PriceCards;
