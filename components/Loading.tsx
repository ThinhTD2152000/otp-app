import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const LoadingIndicator = ({ size = 40, color = 'black' }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const spinAnimation = Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000, // Thời gian quay 1 vòng (ms)
                useNativeDriver: true,
            })
        );
        spinAnimation.start();

        return () => spinAnimation.stop();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View style={styles.container}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <AntDesign name="loading2" size={size} color={color} />
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoadingIndicator;
