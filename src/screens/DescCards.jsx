import { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Animated, StyleSheet, ImageBackground, Image } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';

const DescCards = ({ route }) => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = route.params;

    const navigation = useNavigation();

    const fetchCardData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&language=pt`);
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
                        {cardData.map((card, index) => (
                            <View key={index}>
                                <Image style={style.img} source={{ uri: card.card_images[0].image_url}}/>
                                <Text>Nome: {card.name}</Text>
                                <Text>Tipo: {card.type}</Text>
                                <View>
                                    <Text>Atributo: {card.attribute}</Text>
                                    {
                                        card.archetype != null ? (<Text>Arquétipo: {card.archetype}</Text>)
                                        : (<></>)
                                    }
                                    <Text>Raça: {card.race}</Text>
                                </View>
                                {
                                    card.type != 'Spell Card' || 'Trap Card' ? (
                                            <View>
                                                <Text>Ataque: {card.atk}</Text>
                                                <Text>Defesa: {card.def}</Text>
                                                <View>
                                                {
                                                    card.level != null ? (<Text>Level: {card.level}</Text>)
                                                                        : (<Text>Link: {card.linkval}</Text>)
                                                }
                                                </View>
                                            </View>
                                    )
                                    : (<></>)
                                }
                                <View>
                                   <Text>Descrição: {card.desc}</Text> 
                                </View>
                            </View>
                        ))}
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
    img: {
        width: 450,
        height: 450,
        resizeMode: 'contain',
        position: 'absolute',
        alignSelf: 'center',
        marginTop: 60,
    }
})

export default DescCards;
