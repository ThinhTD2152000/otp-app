import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const TransactionMethodScreen = ({ route }: {
    route: {
        params: {
            isOpenFace: any,
            isOpenOTP: any
        }
    }
}) => {
    const { isOpenFace, isOpenOTP }: any = route?.params;
    const [selectedMethods, setSelectedMethods] = useState<string[]>([]);

    const navigation = useNavigation();


    const methods = [
        {
            id: 'face',
            title: 'Sign up with Face Recognition',
            icon: 'face',
            description: 'Easily authenticate using facial recognition',
            isCheck: isOpenFace
        },
        {
            id: 'otp',
            title: 'Sign up with Smart OTP',
            icon: 'sms',
            description: 'Enter your PIN to generate a Smart OTP automatically',
            isCheck: isOpenOTP
        }
    ];

    const handleContinue = () => {
        if (selectedMethods.length !== 1) {
            Alert.alert('Notification', 'Please select exactly one registration method');
            return;
        }

        (navigation as any).navigate(selectedMethods[0] === 'face' ? 'FaceRegister' : 'SmartOtpRegister');
    };

    const handleMethodPress = (methodId: string) => {
        if (selectedMethods.includes(methodId)) {
            // Show confirmation when unchecking
            if ((methodId === 'face' && isOpenFace) || (methodId === 'otp' && isOpenOTP)) {
                Alert.alert(
                    'Xác nhận',
                    'Bạn có chắc chắn muốn bỏ chọn phương thức này không?',
                    [
                        {
                            text: 'Không',
                            style: 'cancel',
                            onPress: () => { } // Không làm gì
                        },
                        {
                            text: 'Có',
                            onPress: () => {
                                setSelectedMethods(selectedMethods.filter(id => id !== methodId));
                            }
                        }
                    ]
                );
            } else {
                setSelectedMethods(selectedMethods.filter(id => id !== methodId));
            }
        } else {
            // When checking new method, add to current selection
            setSelectedMethods([...selectedMethods, methodId]);
        }
    };

    useEffect(() => {
        const newData = []
        if (isOpenFace) {
            newData.push('face')
        }
        if (isOpenOTP) {
            newData.push('otp')
        }
        setSelectedMethods([...newData])
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>REGISTER TRANSACTION</Text>
            </View>

            {/* Main content */}
            <View style={styles.content}>
                <Text style={styles.subTitle}>Select Registration Method</Text>

                {methods.map((method) => (
                    <TouchableOpacity
                        key={method.id}
                        style={[
                            styles.methodCard,
                            selectedMethods.includes(method.id) && styles.selectedCard,
                        ]}
                        onPress={() => handleMethodPress(method.id)}
                    >
                        <View style={styles.checkboxContainer}>
                            <View style={[
                                styles.checkbox,
                                selectedMethods.includes(method.id) && styles.checkedBox
                            ]}>
                                {selectedMethods.includes(method.id) && (
                                    <MaterialIcons
                                        name="check"
                                        size={18}
                                        color="white"
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.methodInfo}>
                            <View style={styles.methodHeader}>
                                <MaterialIcons
                                    name={method.icon}
                                    size={24}
                                    color={selectedMethods.includes(method.id) ? '#007AFF' : '#666'}
                                />
                                <Text style={[
                                    styles.methodTitle,
                                    selectedMethods.includes(method.id) && styles.selectedText
                                ]}>
                                    {method.title}
                                </Text>
                            </View>
                            <Text style={styles.methodDescription}>{method.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Continue button */}
            <TouchableOpacity
                style={[
                    styles.continueButton,
                    selectedMethods.length !== 1 && styles.disabledButton
                ]}
                onPress={handleContinue}
                disabled={selectedMethods.length !== 1}
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
    checkboxContainer: {
        marginRight: 15,
    },
    checkbox: {
        height: 24,
        width: 24,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#007AFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedBox: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
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
        paddingLeft: 0,
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
    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: '#666',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalButtonNo: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: '#007AFF',
        borderRadius: 5,
        marginRight: 10,
    },
    modalButtonNoText: {
        color: '#007AFF',
        fontWeight: 'bold',
    },
    modalButtonYes: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 5,
    },
    modalButtonYesText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TransactionMethodScreen;