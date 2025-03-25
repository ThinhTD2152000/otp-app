import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const { width } = Dimensions.get('window');

export default function FaceCaptureScreen() {
    const [facePhoto, setFacePhoto] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const captureFace = async () => {
        setIsLoading(true);
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Thông báo', 'Vui lòng cấp quyền truy cập camera');
                return;
            }

            const result: any = await ImagePicker.launchCameraAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [1, 1], // Tỉ lệ vuông cho ảnh chân dung
                quality: 0.8,
                base64: true
            });

            if (!result.canceled) {
                setFacePhoto(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể mở camera');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {!facePhoto ? (
                <View style={styles.captureContainer}>
                    <View style={styles.guideFrame}>
                        <View style={styles.faceOutline} />
                        <Text style={styles.guideText}>Vui lòng để khuôn mặt trong khung oval</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={captureFace}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <MaterialIcons name="photo-camera" size={24} color="white" />
                                <Text style={styles.buttonText}>CHỤP CHÂN DUNG</Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.previewContainer}>
                    <Image source={{ uri: facePhoto }} style={styles.previewImage} />

                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.retakeButton}
                            onPress={() => setFacePhoto(null)}
                        >
                            <MaterialIcons name="replay" size={24} color="white" />
                            <Text style={styles.buttonText}>CHỤP LẠI</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => navigation.navigate('NextScreen')}
                        >
                            <MaterialIcons name="check" size={24} color="white" />
                            <Text style={styles.buttonText}>XÁC NHẬN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center'
    },
    captureContainer: {
        alignItems: 'center',
        width: '100%'
    },
    guideFrame: {
        width: width - 60,
        height: width - 60,
        borderRadius: (width - 60) / 2,
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        backgroundColor: 'rgba(255,255,255,0.1)'
    },
    faceOutline: {
        width: width - 120,
        height: width - 120,
        borderRadius: (width - 120) / 2,
        borderWidth: 1,
        borderColor: 'rgba(0,122,255,0.5)',
        borderStyle: 'dashed'
    },
    guideText: {
        position: 'absolute',
        bottom: -40,
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        width: '80%'
    },
    captureButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        shadowColor: '#007AFF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5
    },
    previewContainer: {
        alignItems: 'center',
        width: '100%'
    },
    previewImage: {
        width: width - 60,
        height: width - 60,
        borderRadius: (width - 60) / 2,
        borderWidth: 2,
        borderColor: '#007AFF',
        marginBottom: 30
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 20
    },
    retakeButton: {
        backgroundColor: '#FF3B30',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    confirmButton: {
        backgroundColor: '#34C759',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
});