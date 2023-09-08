import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, ActivityIndicator, View, StyleSheet, 
  ImageBackground, Image , TouchableOpacity} from 'react-native';
import axios from 'axios';
import HomeButton from '../components/HomeButton';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
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

  const fetchCardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?num=20&offset=${page * 20}`);
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

  const handleCardPress = () => {
    navigation.navigate('DescCards');
  }

  return (
    <SafeAreaView style={style.containerSafe}>
      <ImageBackground
        source={require('../img/BackgroundHome.webp')}
        style={style.imageBG}
      >
        {loading ? (
          <View style={style.loading}>
            <Text style={style.textLoading}>Loading...</Text>
            <ActivityIndicator size="large" color="#c73709"/>
          </View>
        
      ) : (
        <FlatList
          data={cardData}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={handleCardPress}> 
              <View style={style.containerCards}>
                <Image style={style.imageCard} source={{ uri: item.card_images[0].image_url }} />
                <Text style={style.textCards}>{item.name}</Text>
                <Text style={style.textCards}>{item.type}</Text>
              </View>
              </TouchableOpacity>
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
    flex: 1,
    height: 300, 
    resizeMode: 'contain',
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
    opacity: 0.8,
    padding: 10,
    backgroundColor: '#e5a040',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    marginVertical: 10,
  },
  textCards: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFF',
  }
})

export default Home;
