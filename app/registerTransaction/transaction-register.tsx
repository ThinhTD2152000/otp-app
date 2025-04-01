import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TransactionMethodScreen = ({ route }: { route: { params: { methodPay?: any } } }) => {
    const [selectedMethod, setSelectedMethod] = useState<any>(null);
    const navigation = useNavigation()

    const methodPay: any = route?.params.methodPay

    const methods = [
        {
            id: 'face',
            title: 'Sign up with Face Recognition',
            icon: 'face',
            description: 'Easily authenticate using facial recognition'
        },
        {
            id: 'otp',
            title: 'Sign up with Smart OTP',
            icon: 'sms',
            description: 'Enter your PIN to generate a Smart OTP automatically'
        }
    ];

    const handleContinue = () => {
        if (!selectedMethod) {
            Alert.alert('Notification', 'Please select a registration method');
            return;
        }
        (navigation as any).navigate(selectedMethod === 'face' ? 'FaceRegister' : 'SmartOtpRegister');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>REGISTER TRANSACTION</Text>
            </View>

            {/* Nội dung chính */}
            <View style={styles.content}>
                <Text style={styles.subTitle}>Select Registration Method</Text>

                {methods.map((method) => (
                    !methodPay.includes(method.id) &&
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodCard,
                            selectedMethod === method.id && styles.selectedCard,
                        ]}
                        onPress={() => setSelectedMethod(method.id)}
                    >
                        <View style={styles.radioContainer}>
                            <View style={styles.outerCircle}>
                                {selectedMethod === method.id && (
                                    <View style={styles.innerCircle} />
                                )}
                            </View>
                        </View>

                        <View style={styles.methodInfo}>
                            <View style={styles.methodHeader}>
                                <MaterialIcons
                                    name={method.icon}
                                    size={24}
                                    color={selectedMethod === method.id ? '#007AFF' : '#666'}
                                />
                                <Text style={[
                                    styles.methodTitle,
                                    selectedMethod === method.id && styles.selectedText
                                ]}>
                                    {method.title}
                                </Text>
                            </View>
                            <Text style={styles.methodDescription}>{method.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Nút tiếp tục */}
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    !selectedMethod && styles.disabledButton
                ]}
                onPress={handleContinue}
                disabled={!selectedMethod}
            >
                <Text style={styles.continueText}>NEXT</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#007AFF',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    subTitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    methodCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedCard: {
        borderColor: '#007AFF',
        backgroundColor: '#F0F7FF',
    },
    radioContainer: {
        marginRight: 15,
    },
    outerCircle: {
        height: 22,
        width: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF',
    },
    methodInfo: {
        flex: 1,
        minHeight: 70,
    },
    methodHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 10,
        color: '#333',
    },
    selectedText: {
        color: '#007AFF',
    },
    methodDescription: {
        fontSize: 14,
        color: '#666',
        paddingLeft: 0, // Căn lề bằng với icon
    },
    continueButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        margin: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    continueText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TransactionMethodScreen;