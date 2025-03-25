import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OTPVerification = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(59);
    const [isFalse, setIsFalse] = useState(true);

    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleChange = (text: any, index: any) => {
        if (isNaN(text)) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text && index < 5) {
            inputs[index + 1]?.focus();
        }
    };

    // clear back
    const handleKeyPress = (e: any, index: any) => {
        if (e.nativeEvent.key === 'Backspace') {
            const newOtp = [...otp];

            // Nếu ô hiện tại đang trống -> Xóa luôn ô trước đó
            if (!newOtp[index] && index > 0) {
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputs[index - 1]?.focus();
            } else {
                newOtp[index] = "";
                setOtp(newOtp);
            }
        }
    };

    const handleSubmit = () => {
        navigation.navigate('success')
    };

    const inputs: any = [];

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <Image source={require('../assets/images/logo.jpg')} style={styles.logo} />
                <Text style={styles.title}>Vui lòng xác minh</Text>
                <Text style={styles.subtitle}>Nhập mã gồm 6 số mà chúng tôi đã gửi đến bạn</Text>

                <View style={styles.otpContainer}>
                    {otp.map((data, index) => (
                        <TextInput
                            key={index}
                            ref={(input) => (inputs[index] = input)}
                            style={[styles.otpInput, !isFalse && styles.otpError]}
                            keyboardType="numeric"
                            maxLength={1}
                            value={data}
                            onChangeText={(text) => handleChange(text, index)}
                            onKeyPress={(e) => handleKeyPress(e, index)}
                        />
                    ))}
                </View>

                <View style={styles.infoContainer}>
                    {timeLeft !== 0 ? (
                        <Text style={styles.timer}>0:{timeLeft}</Text>
                    ) : (
                        <TouchableOpacity onPress={() => setTimeLeft(59)}>
                            <Text style={styles.resend}>Gửi lại mã</Text>
                        </TouchableOpacity>
                    )}

                    {!isFalse && <Text style={styles.errorText}>Mã OTP không chính xác</Text>}
                </View>

                <TouchableOpacity style={styles.verifyButton} onPress={handleSubmit}>
                    <Text style={styles.verifyText}>Xác thực</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.cancelText}>Hủy</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OTPVerification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
    },
    box: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: 350,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    logo: {
        width: 200,
        height: 100,
        marginBottom: 10,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    otpInput: {
        width: 40,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        textAlign: 'center',
        fontSize: 20,
        marginHorizontal: 5,
    },
    otpError: {
        borderColor: 'red',
    },
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 15,
    },
    timer: {
        color: 'red',
        fontSize: 16,
    },
    resend: {
        color: '#007BFF',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
    },
    verifyButton: {
        backgroundColor: '#66b1ed',
        paddingVertical: 12,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    verifyText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
        paddingVertical: 12,
        width: '100%',
        borderRadius: 5,
        alignItems: 'center',
    },
    cancelText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
