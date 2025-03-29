import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FaceCaptureSuccess = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Tiêu đề */}
            <Text style={styles.title}>XÁC THỰC KHUÔN MẶT THÀNH CÔNG</Text>

            {/* Ảnh khuôn mặt */}
            <Image
                source={require('../assets/images/logo1.jpg')}
                style={styles.faceImage}
                resizeMode="contain"
            />

            {/* Thông báo phụ */}
            <Text style={styles.subText}>Khuôn mặt của bạn đã được xác thực thành công</Text>

            {/* Nút tiếp tục */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => (navigation as any).replace('RegisterPin')} // Thay bằng màn hình tiếp theo
            >
                <Text style={styles.buttonText}>TIẾP TỤC</Text>
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
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2ecc71', // Màu xanh lá
        marginBottom: 30,
        textAlign: 'center',
        textTransform: 'uppercase', // Chữ in hoa
    },
    faceImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: '#2ecc71',
        marginBottom: 20,
    },
    subText: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    continueButton: {
        backgroundColor: '#3498db', // Màu xanh dương
        width: '100%',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
});

export default FaceCaptureSuccess;