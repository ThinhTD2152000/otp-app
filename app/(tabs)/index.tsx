import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [otpMethod, setOtpMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigation = useNavigation();

  const validateEmail = (email: any) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone: any) => /^(0[3|5|7|8|9])([0-9]{8})$/.test(phone);

  const handleSendOtp = async () => {
    const data = otpMethod === 'email' ? email : phone;

    if (otpMethod === 'email' && !validateEmail(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ! Vui lòng nhập đúng định dạng.');
      return;
    } else if (otpMethod === 'phone' && !validatePhone(phone)) {
      Alert.alert('Lỗi', 'Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng số điện thoại Việt Nam.');
      return;
    }
    navigation.navigate('verify');

    // try {
    //   await requestOtp(data);
    // } catch (error) {
    //   Alert.alert('Lỗi', 'Gửi OTP thất bại! Vui lòng thử lại.');
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../../assets/images/logo.jpg')} style={styles.image} />
        <View style={styles.form}>
          <Text style={styles.title}>Xác Thực Mã OTP</Text>
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.switchButton, otpMethod === 'email' && styles.activeButton]}
              onPress={() => setOtpMethod('email')}>
              <Text style={[styles.buttonText, otpMethod === 'email' && styles.activeText]}>Email</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.switchButton, otpMethod === 'phone' && styles.activeButton]}
              onPress={() => setOtpMethod('phone')}>
              <Text style={[styles.buttonText, otpMethod === 'phone' && styles.activeText]}>Số Điện Thoại</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder={otpMethod === 'email' ? 'Nhập địa chỉ email' : 'Nhập số điện thoại'}
            value={otpMethod === 'email' ? email : phone}
            onChangeText={otpMethod === 'email' ? setEmail : setPhone}
            keyboardType={otpMethod === 'email' ? 'email-address' : 'phone-pad'}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendOtp}>
            <Text style={styles.sendButtonText}>Nhận mã OTP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', justifyContent: 'center', alignItems: 'center' },
  card: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20, elevation: 5, alignItems: 'center' },
  image: { width: 200, height: 100, resizeMode: 'contain', marginBottom: 10 },
  form: { width: '100%' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#66b1ed', marginBottom: 20, textAlign: 'center' },
  buttonGroup: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  switchButton: { padding: 12, width: '48%', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, backgroundColor: '#e0e0e0', marginHorizontal: 0 },
  activeButton: { backgroundColor: '#66b1ed' },
  buttonText: { color: 'black' },
  activeText: { color: 'white' },
  input: { height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 },
  sendButton: { backgroundColor: '#66b1ed', paddingVertical: 12, borderRadius: 5, alignItems: 'center', marginBottom: 20 },
  sendButtonText: {
    color: 'white', fontWeight: 'bold', fontSize: 16
  },
});

export default Home;
