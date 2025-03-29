import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }: { route: { params?: { user?: any } } }) => {
    const navigation = useNavigation()

    const user: any = route.params?.user

    return (
        <SafeAreaView style={styles.container}>
            {/* Header với tiêu đề */}
            <View style={styles.header}>
                <Text style={styles.title}>TRANG CHỦ</Text>
            </View>

            {/* Nội dung chính */}
            <View style={styles.content}>
                <Image
                    source={require('../assets/images/logo1.jpg')}
                    style={styles.illustration}
                    resizeMode="contain"
                />

                <Text style={styles.welcomeText}>Chào mừng bạn đến với ứng dụng</Text>
                <Text style={styles.subText}>Bắt đầu đăng ký giao dịch ngay!</Text>
            </View>

            {/* Nút đăng ký giao dịch */}
            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => (navigation as any).navigate('IdCapture')}
            >
                <MaterialIcons name="payment" size={24} color="white" />
                <Text style={styles.buttonText}>XÁC THỰC TÀI KHOẢN</Text>
            </TouchableOpacity>

            {
                !(user?.isOpenOTP && user?.isOpenFace) &&
                <TouchableOpacity
                    style={styles.registerButton}
                    onPress={() => (navigation as any).navigate('TransactionRegister', { methodPay: [user?.isOpenFace ? '' : 'face', user?.isOpenOTP ? '' : 'otp'] })}
                >
                    <MaterialIcons name="payment" size={24} color="white" />
                    <Text style={styles.buttonText}>ĐĂNG KÝ GIAO DỊCH</Text>
                </TouchableOpacity>
            }

            <TouchableOpacity
                style={styles.registerButton}
                onPress={() => (navigation as any).navigate('TransferBank')}
            >
                <MaterialCommunityIcons name="bank-transfer-in" size={26} color="white" />
                <Text style={styles.buttonText}>CHUYỂN KHOẢN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    illustration: {
        width: 250,
        height: 200,
        marginBottom: 32,
    },
    welcomeText: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 40,
    },
    registerButton: {
        backgroundColor: '#007AFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 30,
        margin: 20,
        marginTop: 0,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default HomeScreen;