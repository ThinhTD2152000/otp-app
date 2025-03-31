import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AuthScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Phần 1: Logo và Title */}
            <View style={styles.header}>
                <Image
                    source={require('@/assets/images/logo1.jpg')} // Thay bằng logo của bạn
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>FAST TRANSACTION AUTHENTICATION</Text>
            </View>

            {/* Phần 2: 2 Button dạng cột */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={() => (navigation as any).navigate('Login')}
                >
                    <Text style={styles.loginButtonText}>LOGIN IN</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.registerButton]}
                    onPress={() => (navigation as any).navigate('RegisterAccount')}
                >
                    <Text style={styles.registerButtonText}>REGISTER</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between', // Chia 2 phần cách đều
        padding: 24,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 350,
        height: 350,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        paddingHorizontal: 20,
    },
    buttonContainer: {
        marginBottom: 40, // Khoảng cách với đáy màn hình
    },
    button: {
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 8, // Khoảng cách giữa 2 button
    },
    loginButton: {
        backgroundColor: '#007bff', // Nền xanh
    },
    registerButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#007bff', // Viền xanh
    },
    loginButtonText: {
        color: '#fff', // Chữ trắng
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerButtonText: {
        color: '#007bff', // Chữ xanh
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AuthScreen;