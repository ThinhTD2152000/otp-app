import LoadingIndicator from '@/components/Loading';
import { put } from '@/fetch/apiClient';
import { getMe } from '@/fetch/authAPI';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionSuccessScreen = ({ route }: { route: { params: { method: string } } }) => {
    const navigation = useNavigation();
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<Boolean>(true)

    const method = route.params?.method

    const handleGetMe = async () => {
        try {
            const res = await getMe()
            console.log(res)
            setUser(res)
        } catch (error) {
        } finally {
            setIsLoading(false)
        }
    }

    //update is method to face or smart otp
    const handleUpdatePayment = async () => {
        const newData: any = {}

        if (method === 'face') {
            newData.isOpenFace = true
        } else {
            newData.isOpenOTP = true
        }
        try {
            const res = put(`users/${user.id}`, newData)
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleGetMe()
        handleUpdatePayment()
    }, [])


    return (
        isLoading ? (
            <View style={styles.containerImage}>
                <LoadingIndicator />
            </View>
        ) : (
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
                    onPress={() => (navigation as any).replace('Home')}
                >
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
            </View>
        )
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

export default TransactionSuccessScreen;