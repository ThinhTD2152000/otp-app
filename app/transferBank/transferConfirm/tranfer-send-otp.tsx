import { post } from '@/fetch/apiClient';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import * as Crypto from 'expo-crypto';

const TransferSendOTP = ({ route }: any) => {
    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation()

    const { amount, secretKey } = route.params

    const generateNumericOTP = useCallback(async (): Promise<string> => {
        try {
            const timestamp = Math.floor(Date.now() / 60000);
            const input = `${timestamp}-${secretKey}`;

            const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                input
            );

            const bigNum = BigInt('0x' + digest);
            return bigNum.toString().slice(-6).padStart(6, '0');
        } catch (err) {
            console.error('Error generating OTP:', err);
            throw err;
        }
    }, [secretKey]);

    // Cập nhật OTP và reset countdown
    const updateOTP = useCallback(async () => {
        setIsLoading(true);
        try {
            const newOtp = await generateNumericOTP();
            setOtp(newOtp);
            setError(null);
        } catch (err) {
            setError('Not created pin!');
            console.error('OTP generation failed:', err);
        } finally {
            setIsLoading(false);
        }
    }, [generateNumericOTP]);

    // Xác thực OTP
    const handleVerifyOTP = async () => {
        if (!otp) return;

        try {
            setIsLoading(true);
            const res = await post('otp/verify-otp', {
                otp: otp,
                secretKey: secretKey,
                money: Number(amount)
            });

            (navigation as any).replace('TransferSuccessScreen');
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError('Verify failed.');
        } finally {
            setIsLoading(false);
        }
    };

    // Effect cho countdown và tự động cập nhật OTP
    useEffect(() => {
        updateOTP(); // Tạo OTP lần đầu
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Smart OTP code</Text>

            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}

            <View style={styles.otpContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#4CAF50" />
                ) : (
                    otp.split('').map((digit, index) => (
                        <View key={index} style={styles.otpBox}>
                            <Text style={styles.otpText}>{digit}</Text>
                        </View>
                    ))
                )}
            </View>

            <TouchableOpacity
                style={[styles.confirmButton, (!otp || isLoading) && styles.disabledButton]}
                onPress={handleVerifyOTP}
                disabled={!otp || isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.confirmButtonText}>CONFIRM</Text>
                )}
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
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    errorText: {
        color: '#FF3B30',
        marginBottom: 15,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
        minHeight: 70,
        alignItems: 'center',
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
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#A5D6A7',
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
});

export default TransferSendOTP;