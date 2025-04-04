import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import LoadingIndicator from '@/components/Loading';
import { getMe } from '@/fetch/authAPI';
import { post } from '@/fetch/apiClient';
import * as FileSystem from "expo-file-system";
import * as ImageManipulator from "expo-image-manipulator";
import { useNavigation } from 'expo-router';

const HandleFaceTransaction = ({ route }: any) => {
    const [user, setUser] = useState<any>(null);

    const portrait = route.params.portrait

    const navigation = useNavigation();

    const handleRegisterFace = async () => {
        const imageUri = Platform.OS === "ios" ? portrait.replace("file://", "") : portrait;

        // Verify image exists
        const fileInfo = await FileSystem.getInfoAsync(imageUri);
        if (!fileInfo.exists) {
            throw new Error("Image file does not exist");
        }

        // Resize and compress image
        const resizedImage = await ImageManipulator.manipulateAsync(
            portrait,
            [{ resize: { width: 800 } }],
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );

        // Prepare form data
        const formData = new FormData();
        formData.append('portrait_image', {
            uri: resizedImage.uri,
            type: 'image/jpeg',
            name: 'portrait.jpg',
        } as any);
        formData.append('front_image', {
            uri: user.image[0],
            type: 'image/jpeg',
            name: 'front.jpg',
        } as any);

        try {
            // Submit to server
            await post(
                'kyc/compare-face',
                formData,
                {
                    'Content-Type': 'multipart/form-data',
                },
                true
            );
            (navigation as any).replace('SuccessTransaction', { method: 'otp' })

        } catch (error) {
            console.log(error)
        }
    }

    const handleGetMe = async () => {
        try {
            const res = await getMe(); // Added await here
            setUser(res);
        } catch (error) {
            console.error('Failed to fetch user:', error);
        }
    };

    useEffect(() => {
        handleGetMe();
        handleRegisterFace
    }, []);


    return (
        <View style={styles.container}>
            <LoadingIndicator /> {/* Sử dụng component Loading của bạn */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff', // Màu nền tùy chọn
    },
});

export default HandleFaceTransaction;