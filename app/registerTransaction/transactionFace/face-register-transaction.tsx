import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert, Platform, ActivityIndicator } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

export default function FaceRegisterTransaction() {
    const navigation = useNavigation();
    const captureFace = async () => {

        try {
            // Check and request camera permissions
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Required', 'Please grant camera permissions to continue');
                return;
            }

            // Launch camera
            const result: any = await ImagePicker.launchCameraAsync({
                mediaType: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [1, 1],
                quality: 0.8,
                base64: true
            });

            if (!result.canceled) {
                (navigation as any).replace('HandleFaceTransaction', {
                    portrait: result.assets[0].uri
                });
            }

            // Navigate to success screen

        } catch (error: any) {
            console.error('Face capture error:', error);
            Alert.alert('Error', error.message || 'Failed to capture and process image');
        } finally {
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.captureContainer}>
                <Text style={styles.guideText}>ALIGN YOUR FACE WITHIN THE FRAME</Text>
                <View style={styles.guideFrame}>
                    <View style={styles.faceOutline}>
                        <AntDesign
                            name="user"
                            size={120}
                            color="#007AFF"
                            style={{ marginBottom: 15 }}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    style={[styles.captureButton]}
                    onPress={captureFace}
                >
                    <>
                        <MaterialIcons name="photo-camera" size={24} color="white" />
                        <Text style={styles.buttonText}>NEXT</Text>
                    </>
                </TouchableOpacity>
            </View>
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
        borderStyle: 'dashed',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    guideText: {
        position: 'absolute',
        top: -70,
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        width: '70%',
        paddingTop: 10,
        paddingBottom: 10,
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
    disabledButton: {
        opacity: 0.7
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    }
});