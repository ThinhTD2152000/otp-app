import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TransferSuccessScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/success.jpg')}
                style={styles.successImage}
                resizeMode="contain"
            />

            <Text style={styles.successMessage}>
                You have successfully made a payment.
            </Text>

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => (navigation as any).replace('Home')}
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
        width: 400,
        height: 200,
        marginBottom: 10,
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
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});


export default TransferSuccessScreen;