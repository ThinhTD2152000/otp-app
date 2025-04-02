import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionSuccessScreen = ({ route }: { route: { params: { method: string } } }) => {
    const navigation = useNavigation();

    const method = route.params?.method

    return (
        <View style={styles.container}>
            {/* Hình ảnh success */}
            <Image
                source={require('@/assets/images/success.jpg')}
                style={styles.successImage}
                resizeMode="contain"
            />

            {/* Thông báo */}
            <Text style={styles.successMessage}>
                {method === ' face' ? 'You have successfully validated your face transaction!' : 'You have successfully verified the transaction with smart OTP!'}
            </Text>

            {/* Nút Home màu xanh dương */}
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => (navigation as any).navigate('Home')}
            >
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    successTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#3498db', // Màu xanh dương
        marginBottom: 20,
        textAlign: 'center',
    },
    successImage: {
        width: 200,
        height: 200,
        marginBottom: 30,
    },
    successMessage: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    homeButton: {
        backgroundColor: '#3498db', // Màu xanh dương
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
        width: '80%',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default TransactionSuccessScreen;