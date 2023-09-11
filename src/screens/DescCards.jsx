import { SafeAreaView, Text } from "react-native";

const DescCards = () => {

    let animatedValue = new Animated.Value(0);

    let currentValue = 0;
  
    animatedValue.addListener(({ value }) => {
      currentValue = value;
    });
  
    const flipImageAnimation = () => {
      if (currentValue >= 90)  {
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
        }).start();
      }
    }
  
    const setInterpolate = animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['00deg', '180deg'],
    });
  
    const rotateYAnimatedStyle = {
      transform: [{ rotateY: setInterpolate }],
    };

    return (
        <SafeAreaView>
            <Text>DescCards</Text>
        </SafeAreaView>
    );
}

export default DescCards;