import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigate } from '@/hooks/useNavigation';

const RegistrationSuccessScreen = () => {
    const navigate = useNavigate()
    return (
        <View style={styles.container}>
            {/* Biểu tượng thành công */}
            <View style={styles.successIcon}>
                <MaterialIcons name="check-circle" size={80} color="#4CAF50" />
            </View>

            {/* Tiêu đề */}
            <Text style={styles.title}>ĐĂNG KÝ THÀNH CÔNG!</Text>

            {/* Mô tả */}
            <Text style={styles.description}>
                Chúc mừng bạn đã đăng ký tài khoản thành công.
                {'\n'}Hãy bắt đầu trải nghiệm ứng dụng ngay nào!
            </Text>

            {/* Ảnh minh họa */}
            <Image
                source={require('../assets/images/cccd.png')}
                style={styles.illustration}
                resizeMode="contain"
            />

            {/* Nút quay về trang chủ */}
            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigate('Home')}
            >
                <Text style={styles.buttonText}>QUAY VỀ TRANG CHỦ</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    successIcon: {
        marginBottom: 24
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 32
    },
    illustration: {
        width: 200,
        height: 200,
        marginBottom: 40
    },
    homeButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        width: '100%',
        maxWidth: 300
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default RegistrationSuccessScreen;