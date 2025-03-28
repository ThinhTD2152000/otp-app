import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TransactionInfoScreen = () => {
    const [currentBalance, setCurrentBalance] = useState(50000); // Giả sử số dư hiện tại là 50,000 VND
    const [transferAmount, setTransferAmount] = useState(55678); // Số tiền chuyển
    const [isProcessing, setIsProcessing] = useState(false);

    // Kiểm tra số dư khi màn hình được load
    useEffect(() => {
        checkBalance();
    }, []);

    const checkBalance = () => {
        if (transferAmount > currentBalance) {
            Alert.alert(
                'Thông báo',
                'Số dư không đủ để thực hiện giao dịch',
                [{ text: 'Đã hiểu', onPress: () => console.log('OK Pressed') }]
            );
        }
    };

    const handleContinue = () => {
        if (transferAmount > currentBalance) {
            Alert.alert(
                'Lỗi',
                'Số dư trong tài khoản không đủ để thực hiện giao dịch này',
                [{ text: 'Đã hiểu' }]
            );
            return;
        }

        setIsProcessing(true);
        // Giả lập xử lý giao dịch
        setTimeout(() => {
            setIsProcessing(false);
            // Chuyển sang màn hình xác nhận thành công
            // navigation.navigate('TransactionSuccess');
            Alert.alert('Thành công', 'Giao dịch đã được thực hiện');
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Thông tin giao dịch</Text>

            <View style={styles.infoContainer}>
                <Text style={styles.accountNumber}>2152865981</Text>

                {/* Hiển thị số tiền - đổi màu đỏ nếu không đủ số dư */}
                <Text style={[
                    styles.amount,
                    transferAmount > currentBalance && styles.insufficientAmount
                ]}>
                    {transferAmount.toLocaleString()} VND
                </Text>

                <View style={styles.bankInfo}>
                    <Text style={styles.bankAccount}>19036341990012</Text>
                    <Text style={styles.bankName}>NGO THI QUYNH TRANG</Text>
                    <Text style={styles.bankName}>Techcombank</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Số tiền</Text>
                    <Text style={styles.detailValue}>{transferAmount.toLocaleString()} VND</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Số dư khả dụng</Text>
                    <Text style={styles.detailValue}>{currentBalance.toLocaleString()} VND</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Nội dung giao dịch</Text>
                    <Text style={styles.detailValue}>29/150</Text>
                </View>

                <Text style={styles.transactionNote}>NGUYEN TRUONG SON Chuyen tien</Text>
            </View>

            {/* Hiển thị cảnh báo nếu số dư không đủ */}
            {transferAmount > currentBalance && (
                <Text style={styles.warningText}>⚠️ Số dư không đủ để thực hiện giao dịch</Text>
            )}

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    (transferAmount > currentBalance || isProcessing) && styles.disabledButton
                ]}
                onPress={handleContinue}
                disabled={transferAmount > currentBalance || isProcessing}
            >
                <Text style={styles.continueButtonText}>
                    {isProcessing ? 'Đang xử lý...' : 'Tiếp tục'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    infoContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    accountNumber: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
        textAlign: 'center',
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2ecc71',
        marginBottom: 20,
        textAlign: 'center',
    },
    insufficientAmount: {
        color: '#e74c3c', // Màu đỏ khi không đủ số dư
    },
    bankInfo: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 15,
    },
    bankAccount: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    bankName: {
        fontSize: 16,
        color: '#555',
        textAlign: 'center',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f5f5f5',
    },
    detailLabel: {
        fontSize: 16,
        color: '#666',
    },
    detailValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    transactionNote: {
        fontSize: 16,
        color: '#333',
        marginTop: 15,
        fontStyle: 'italic',
        textAlign: 'center',
    },
    warningText: {
        color: '#e74c3c',
        textAlign: 'center',
        marginBottom: 15,
        fontWeight: '500',
    },
    continueButton: {
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#95a5a6',
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default TransactionInfoScreen;