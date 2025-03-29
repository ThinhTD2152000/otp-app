import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TransferSendOTP = () => {
    const [otp, setOtp] = useState('');
    const [countdown, setCountdown] = useState(60);

    const navigation = useNavigation()

    // Giả lập API trả về OTP (6 chữ số)
    useEffect(() => {
        // Trong thực tế, bạn sẽ gọi API ở đây
        const fakeApiCall = async () => {
            // Giả lập delay gọi API
            await new Promise(resolve => setTimeout(resolve, 1000));
            const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
            setOtp(generatedOtp);
        };

        fakeApiCall();
    }, []);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResendOtp = () => {
        // Gọi lại API để lấy OTP mới
        const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setOtp(newOtp);
        setCountdown(60);
    };

    const handleConfirm = () => {
        // Xử lý xác nhận OTP
        console.log('Xác nhận OTP:', otp);
        (navigation as any).replace('SuccessTransaction')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mã Smart OTP của bạn</Text>

            <View style={styles.otpContainer}>
                {otp ? (
                    otp.split('').map((digit, index) => (
                        <View key={index} style={styles.otpBox}>
                            <Text style={styles.otpText}>{digit}</Text>
                        </View>
                    ))
                ) : (
                    <Text>Đang tải mã OTP...</Text>
                )}
            </View>

            <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirm}
                disabled={!otp}
            >
                <Text style={styles.confirmButtonText}>Xác nhận</Text>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
                <Text style={styles.resendText}>Mã OTP sẽ hết hạn sau: {countdown}s</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    otpBox: {
        width: 50,
        height: 60,
        borderWidth: 1,
        borderColor: '#4CAF50',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    otpText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
        opacity: 1,
    },
    confirmButtonDisabled: {
        opacity: 0.5,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    resendText: {
        color: '#666',
        marginBottom: 10,
    },
    resendLink: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default TransferSendOTP;