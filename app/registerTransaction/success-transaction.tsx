import LoadingIndicator from '@/components/Loading';
import { put } from '@/fetch/apiClient';
import { getMe } from '@/fetch/authAPI';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TransactionSuccessScreen = ({ route }: { route: { params: { method: string } } }) => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const method = route.params?.method;

    const handleGetMe = async () => {
        try {
            const res = await getMe();
            if (res?._id) {
                return res._id; // Trả về id để sử dụng trong hàm tiếp theo
            } else {
                throw new Error('User ID not found');
            }
        } catch (error) {
            throw error; // Ném lỗi để xử lý ở nơi gọi
        }
    };

    const handleUpdatePayment = async (userId: string) => {
        const newData: any = {};

        if (method === 'face') {
            newData.isOpenFace = true;
        } else {
            newData.isOpenOTP = true;
        }

        try {
            await put(`users/${userId}`, newData);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const initialize = async () => {
            try {
                const userId = await handleGetMe(); // Lấy id từ handleGetMe
                if (userId) {
                    await handleUpdatePayment(userId); // Truyền id vào handleUpdatePayment
                }
            } catch (error) {
            }
        };

        initialize();
    }, []);

    if (isLoading) {
        return (
            <View style={styles.containerImage}>
                <LoadingIndicator />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('@/assets/images/success.jpg')}
                style={styles.successImage}
                resizeMode="contain"
            />

            <Text style={styles.successMessage}>
                {method === 'face'
                    ? 'You have successfully validated your face transaction!'
                    : 'You have successfully verified the transaction with smart OTP!'}
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

export default TransactionSuccessScreen;