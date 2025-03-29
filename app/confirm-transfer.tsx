import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal } from 'react-native';

const TransferBankConfirm = () => {
    const [senderInfo] = useState({
        name: 'NGUYEN VAN A',
        account: '1234567890',
        balance: 1000000, // 1,000,000 VND
        bank: 'Vietcombank'
    });

    const [receiverInfo] = useState({
        name: 'NGO THI QUYNH TRANG',
        account: '19036341990012',
        bank: 'Techcombank'
    });

    const navigation = useNavigation()
    const [showPaymentMethodModal, setShowPaymentMethodModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'face' | 'otp'>('face');
    const [amount, setAmount] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const handleTransfer = () => {
        const transferAmount = parseInt(amount.replace(/\D/g, '')) || 0;

        if (!transferAmount) {
            Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ');
            return;
        }

        if (transferAmount > senderInfo.balance) {
            Alert.alert(
                'Số dư không đủ',
                `Số dư hiện tại: ${senderInfo.balance.toLocaleString()} VND\nBạn cần thêm ${(transferAmount - senderInfo.balance).toLocaleString()} VND để thực hiện giao dịch`,
                [{ text: 'Đã hiểu' }]
            );
            return;
        }

        setIsConfirming(true);

        // Giả lập call API
        setTimeout(() => {
            setIsConfirming(false);
            (navigation as any).navigate(paymentMethod === 'face' ? 'TransferConfirmFace' : 'TransferConfirmOTP', {
                amount: transferAmount,
                receiver: receiverInfo.name,
                receiverBank: receiverInfo.bank
            });
        }, 1500);
    };

    // Format số tiền khi nhập
    const formatAmount = (text: any) => {
        const num = parseInt(text.replace(/\D/g, '')) || 0;
        setAmount(num.toLocaleString('vi-VN'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>THANH TOÁN</Text>

            {/* Thông tin người chuyển */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Người chuyển</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>{senderInfo.name}</Text>
                    <Text style={styles.infoText}>{senderInfo.account}</Text>
                    <Text style={styles.infoText}>{senderInfo.bank}</Text>
                    <Text style={styles.balanceText}>
                        Số dư: {senderInfo.balance.toLocaleString('vi-VN')} VND
                    </Text>
                </View>
            </View>

            {/* Thông tin người nhận */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Người nhận</Text>
                <View style={styles.infoCard}>
                    <Text style={styles.infoText}>{receiverInfo.name}</Text>
                    <Text style={styles.infoText}>{receiverInfo.account}</Text>
                    <Text style={styles.infoText}>{receiverInfo.bank}</Text>
                </View>
            </View>

            {/* Nhập số tiền */}
            <View style={styles.amountInputContainer}>
                <Text style={styles.inputLabel}>Số tiền chuyển (VND)</Text>
                <TextInput
                    style={styles.amountInput}
                    placeholder="Nhập số tiền"
                    value={amount}
                    onChangeText={formatAmount}
                    keyboardType="numeric"
                />
            </View>

            {/* Phương thức thanh toán */}
            <TouchableOpacity
                style={styles.paymentMethodContainer}
                onPress={() => setShowPaymentMethodModal(true)}
            >
                <Text style={styles.paymentMethodLabel}>Phương thức thanh toán</Text>
                <Text style={styles.paymentMethodValue}>
                    {paymentMethod === 'face' ? 'Xác thực khuôn mặt' : 'Smart OTP'}
                </Text>
            </TouchableOpacity>

            {/* Nút xác nhận */}
            <TouchableOpacity
                style={[styles.confirmButton, (!amount || isConfirming) && styles.disabledButton]}
                onPress={handleTransfer}
                disabled={!amount || isConfirming}
            >
                <Text style={styles.confirmButtonText}>
                    {isConfirming ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN THANH TOÁN'}
                </Text>
            </TouchableOpacity>

            {/* Modal chọn phương thức thanh toán */}
            <Modal
                visible={showPaymentMethodModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowPaymentMethodModal(false)}
            >
                <View style={styles.paymentMethodModalBackground}>
                    <View style={styles.paymentMethodModalContainer}>
                        <Text style={styles.paymentMethodModalTitle}>Chọn phương thức thanh toán</Text>

                        {/* Option Khuôn mặt */}
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('face')}
                        >
                            <View style={styles.radioButton}>
                                {paymentMethod === 'face' && <View style={styles.radioButtonSelected} />}
                            </View>
                            <Text style={styles.paymentOptionText}>Xác thực khuôn mặt</Text>
                        </TouchableOpacity>

                        {/* Option Smart OTP */}
                        <TouchableOpacity
                            style={styles.paymentOption}
                            onPress={() => setPaymentMethod('otp')}
                        >
                            <View style={styles.radioButton}>
                                {paymentMethod === 'otp' && <View style={styles.radioButtonSelected} />}
                            </View>
                            <Text style={styles.paymentOptionText}>Smart OTP</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.confirmPaymentMethodButton}
                            onPress={() => setShowPaymentMethodModal(false)}
                        >
                            <Text style={styles.confirmPaymentMethodText}>XÁC NHẬN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal loading (giữ nguyên) */}
            <Modal visible={isConfirming} transparent>
                {/* ... (giữ nguyên phần loading) */}
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#7f8c8d',
        marginBottom: 8,
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    infoText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    balanceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27ae60',
        marginTop: 8,
    },
    amountInputContainer: {
        marginVertical: 25,
    },
    inputLabel: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 8,
    },
    amountInput: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 18,
        fontWeight: 'bold',
    },
    confirmButton: {
        backgroundColor: '#3498db',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#333',
    },
    paymentMethodContainer: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        marginBottom: 20,
    },
    paymentMethodLabel: {
        fontSize: 14,
        color: '#7f8c8d',
        marginBottom: 5,
    },
    paymentMethodValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    paymentMethodModalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paymentMethodModalContainer: {
        backgroundColor: '#fff',
        width: '80%',
        borderRadius: 10,
        padding: 20,
    },
    paymentMethodModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    radioButtonSelected: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#3498db',
    },
    paymentOptionText: {
        fontSize: 16,
        color: '#333',
    },
    confirmPaymentMethodButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    confirmPaymentMethodText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default TransferBankConfirm;