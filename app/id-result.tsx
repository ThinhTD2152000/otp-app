import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const IDCardResultScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const ocrData: any = {
        idNumber: '0123456789',
        fullName: 'NGUYEN VAN A',
        dob: '01/01/1990',
        gender: 'Nam',
        nationality: 'Việt Nam',
        hometown: 'Hà Nội',
        address: '123 Đường ABC, Quận 1, TP.HCM',
        issueDate: '01/01/2020',
        issuePlace: 'CA TP Hà Nội',
        frontImage: 'base64_or_url_image', // (nếu có)
        backImage: 'base64_or_url_image'
    }
    // const { ocrData }: any = route.params; // Nhận dữ liệu OCR từ màn hình chụp

    // Các trường thông tin CCCD
    const fields = [
        { label: 'Số CCCD', value: ocrData.idNumber },
        { label: 'Họ và tên', value: ocrData.fullName },
        { label: 'Ngày sinh', value: ocrData.dob },
        { label: 'Giới tính', value: ocrData.gender },
        { label: 'Quốc tịch', value: ocrData.nationality },
        { label: 'Quê quán', value: ocrData.hometown },
        { label: 'Địa chỉ thường trú', value: ocrData.address },
        { label: 'Ngày cấp', value: ocrData.issueDate },
        { label: 'Nơi cấp', value: ocrData.issuePlace },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Phần header */}
            <View style={styles.header}>
                <Text style={styles.successTitle}>OCR thành công</Text>
                {ocrData.frontImage && (
                    <Image
                        source={{ uri: ocrData.frontImage }}
                        style={styles.idImage}
                        resizeMode="contain"
                    />
                )}
            </View>

            {/* Phần thông tin chi tiết */}
            <View style={styles.infoContainer}>
                {fields.map((field, index) => (
                    field.value && (
                        <View key={index} style={styles.infoRow}>
                            <Text style={styles.label}>{field.label}:</Text>
                            <Text style={styles.value}>{field.value}</Text>
                        </View>
                    )
                ))}
            </View>

            {/* Button tiếp tục */}
            <TouchableOpacity
                style={styles.continueButton}
                onPress={() => (navigation as any).replace('FaceCapture')}
            >
                <Text style={styles.continueButtonText}>Tiếp tục</Text>
            </TouchableOpacity>
        </ScrollView>
    );
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
});

export default IDCardResultScreen;