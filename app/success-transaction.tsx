import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const TransactionSuccessScreen = () => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                {/* <Image
                    source={require('../assets/success-icon.png')} // Thay bằng đường dẫn hình ảnh của bạn
                    style={styles.successIcon}
                /> */}
                <Text style={styles.title}>Giao dịch thành công</Text>
                <Text style={styles.subtitle}>Bạn đã xác nhận mã Smart OTP thành công</Text>

                {/* Thông tin giao dịch (nếu cần) */}
                <View style={styles.infoContainer}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Mã giao dịch:</Text>
                        <Text style={styles.infoValue}>GD123456789</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Thời gian:</Text>
                        <Text style={styles.infoValue}>12:30 20/06/2023</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Số tiền:</Text>
                        <Text style={styles.infoValue}>1.000.000 VND</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => (navigation as any).reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                })}
            >
                <Text style={styles.homeButtonText}>Quay về trang chủ</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'space-between',
    },
    content: {
        alignItems: 'center',
        marginTop: 50,
    },
    successIcon: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    infoContainer: {
        width: '100%',
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginTop: 20,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
    },
    homeButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 30,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TransactionSuccessScreen;