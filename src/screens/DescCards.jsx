import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, Animated, StyleSheet, ImageBackground, 
    ScrollView, TouchableOpacity } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const DescCards = ({ route }) => {
    const [cardData, setCardData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { id } = route.params;

    const navigation = useNavigation();

    const fetchCardData = async () => {
        try {
            setLoading(true);
            const response = await axios.
                get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}&language=pt`);
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
        Animated.spring(animatedValue, {
            toValue: 180,
            tension: 10,
            friction: 8,
            useNativeDriver: true,
        }).start(() => {
            setIsFlipped(!isFlipped);
        });
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
                source={require('../img/DescImgBK.jpeg')}
                style={style.imageBG}>
                {loading ? (
                    <View style={style.loading}>
                        <Text style={style.textLoading}>Loading...</Text>
                        <ActivityIndicator size="large" color="#c73709" />
                    </View>
                ) : (
                    <View>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={style.backButton}>
                            <Icon name="arrow-left" size={30} color="#fff" />
                        </TouchableOpacity>
                        {cardData.map((card, index) => (
                            <ScrollView key={index}>
                                <TouchableOpacity onPress={flipImageAnimation}>
                                    {isFlipped === false ? (<Animated.Image style={[
                                        style.img, rotateYAnimatedStyle]} 
                                        source={require('../img/ReverseCard.jpg')} />)
                                        : (<Animated.Image style={[style.img, rotateYAnimatedStyle]} 
                                            source={{ uri: card.card_images[0].image_url }} />)}
                                </TouchableOpacity>
                                <View style={style.containerCSS}>
                                    <Text style={style.textCSS}>Nome: {card.name}</Text>
                                    <Text style={style.textCSS}>Tipo: {card.type}</Text>
                                    <View>
                                        {card.type !== 'Spell Card' && card.type !== 'Trap Card'
                                            ? (<Text style={style.textCSS}>Atributo: {card.attribute}</Text>)
                                            : (<></>)}
                                        <View>
                                            { card.archetype != null ? (<Text style={style.textCSS}>
                                                Arquétipo: {card.archetype}</Text>) : (<></>)}
                                        </View>
                                        <Text style={style.textCSS}>Raça: {card.race}</Text>
                                    </View>
                                    {
                                        card.type !== 'Spell Card' && card.type !== 'Trap Card' ? (
                                            <View>
                                                <View style={style.rowStatus}>
                                                    <View>
                                                        {card.atk != null ? (<Text style={[style.textCSS, 
                                                            style.textRowPadi]}>
                                                            Ataque: {card.atk}</Text>): (<></>)}
                                                    </View>
                                                    <View>
                                                        {card.def != null ? (<Text style={[style.textCSS, 
                                                            style.textRowPadi]}>
                                                            Defesa: {card.def}</Text>) : (<></>)}
                                                    </View>
                                                    <View>
                                                        {card.level != null ? (<Text style={style.textCSS}>
                                                            Level: {card.level}</Text>) : (<Text style={
                                                                style.textCSS}>
                                                            Link: {card.linkval}</Text>)}
                                                    </View>
                                                </View>
                                            </View>
                                        ) : (<></>)
                                    }
                                    <View>
                                        <Text style={[style.textCSS, style.descJust]}>
                                            Descrição: {card.desc}</Text>
                                    </View>
                                </View>
                            </ScrollView>
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
    },
    textCSS: {
        color: '#FFF',
        paddingVertical: 4,
    },
    containerCSS: {
        flex: 1,
        marginTop: 520,
        paddingHorizontal: 12,
        paddingVertical: 12,
        marginHorizontal: 10,
        borderRadius: 20,
        borderWidth: 1,
        backgroundColor: '#4f181b',
        height: '100%',
        marginBottom: 20,
        opacity: 0.8,
    },
    rowStatus: {
        flex: 1,
        flexDirection: 'row',
    },
    textRowPadi: {
        paddingRight: 10,
    },
    descJust: {
        textAlign: 'justify',
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 0,
        zIndex: 1,
    },
});

export default DescCards;
