import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { post } from '@/fetch/apiClient';
import LoadingIndicator from '@/components/Loading';
import * as FileSystem from 'expo-file-system';
import RNFS from "react-native-fs";

const IDCardResultScreen = ({ route }: { route: { params: { ocrData: any } } }) => {

    const testImage = require('@/assets/images/ocr.jpeg')
    const [data, setData] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)


    const navigation = useNavigation();
    // const ocrData: any = {
    //     idNumber: '0123456789',
    //     fullName: 'NGUYEN VAN A',
    //     dob: '01/01/1990',
    //     gender: 'Nam',
    //     nationality: 'Việt Nam',
    //     hometown: 'Hà Nội',
    //     address: '123 Đường ABC, Quận 1, TP.HCM',
    //     issueDate: '01/01/2020',
    //     issuePlace: 'CA TP Hà Nội',
    //     frontImage: 'base64_or_url_image', // (nếu có)
    //     backImage: 'base64_or_url_image'
    // }
    const ocrData = route.params.ocrData
    console.log(ocrData)

    // Các trường thông tin CCCD
    const fields = [
        { label: 'Số CCCD', value: ocrData },
        // { label: 'Họ và tên', value: ocrData.fullName },
        // { label: 'Ngày sinh', value: ocrData.dob },
        // { label: 'Giới tính', value: ocrData.gender },
        // { label: 'Quốc tịch', value: ocrData.nationality },
        // { label: 'Quê quán', value: ocrData.hometown },
        // { label: 'Địa chỉ thường trú', value: ocrData.address },
        // { label: 'Ngày cấp', value: ocrData.issueDate },
        // { label: 'Nơi cấp', value: ocrData.issuePlace },
    ];

    const handleOCR = async () => {
        const fileInfo = await FileSystem.getInfoAsync(ocrData);
        try {
            const formData: any = new FormData()
            formData.append('image', {
                url: Image.resolveAssetSource(testImage).uri,
                type: 'image/jpeg',
                name: 'ocr.jpeg'
            })
            console.log('FormData:', formData);
            const res = await post('kyc/OCR', formData,
                {
                    'Content-Type': 'multipart/form-data'

                }, true)
            console.log(res)

            setData(res)
        } catch (error) {
            throw error
        } finally {
            setIsLoading(false)
        }
    }





    useEffect(() => {
        const fetchData = async () => {
            await handleOCR();
        };
        fetchData();
    }, []);

    return (

        isLoading ?
            <View style={styles.containerImage} >
                <LoadingIndicator />
                <Text style={styles.loadingText}>Processing...</Text>
            </View > :
            (
                data.data.response_code !== 500 ?
                    <ScrollView contentContainerStyle={styles.container
                    } >
                        {/* Phần header */}
                        < View style={styles.header} >
                            <Text style={styles.successTitle}>OCR thành công</Text>
                            {
                                ocrData && (
                                    <Image
                                        source={{ uri: ocrData }}
                                        style={styles.idImage}
                                        resizeMode="contain"
                                    />
                                )
                            }
                        </View >

                        {/* Phần thông tin chi tiết */}
                        < View style={styles.infoContainer} >
                            {
                                fields.map((field, index) => (
                                    field.value && (
                                        <View key={index} style={styles.infoRow}>
                                            <Text style={styles.label}>{field.label}:</Text>
                                            <Text style={styles.value}>{field.value}</Text>
                                        </View>
                                    )
                                ))
                            }
                        </View >

                        {/* Button tiếp tục */}
                        < TouchableOpacity
                            style={styles.continueButton}
                            onPress={() => (navigation as any).replace('FaceCapture')}
                        >
                            <Text style={styles.continueButtonText}>Tiếp tục</Text>
                        </TouchableOpacity >
                    </ScrollView > : <View style={styles.container_error}>
                        {/* Tiêu đề màu đỏ */}
                        <Text style={styles.errorTitle_error}>OCR Failed</Text>

                        {/* Hình ảnh thất bại */}
                        <Image
                            source={require('@/assets/images/notData.jpeg')} // Thay bằng đường dẫn hình ảnh của bạn
                            style={styles.errorImage_error}
                            resizeMode="contain"
                        />

                        {/* Thông báo lỗi */}
                        <Text style={styles.errorMessage_error}>
                            Unable to recognize information from the image. Please try again with a clearer image.
                        </Text>

                        {/* Nút quay lại màu xanh */}
                        <TouchableOpacity
                            style={styles.backButton_error}
                            onPress={() => (navigation as any).goBack()}
                        >
                            <Text style={styles.buttonText_error}>BACK</Text>
                        </TouchableOpacity>
                    </View>
            )
    )
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50', // Màu xanh lá
        marginBottom: 20,
    },
    idImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    infoContainer: {
        marginBottom: 30,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    label: {
        width: '40%',
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        width: '60%',
        color: '#333',
    },
    continueButton: {
        backgroundColor: '#3498db', // Màu xanh dương
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    containerImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#333', // màu chữ
    },
    container_error: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    errorTitle_error: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'red',
        marginBottom: 20,
    },
    errorImage_error: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    errorMessage_error: {
        fontSize: 16,
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    backButton_error: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        width: '80%',
    },
    buttonText_error: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default IDCardResultScreen;