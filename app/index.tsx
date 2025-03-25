import { useNavigate } from '@/hooks/useNavigation';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    // if (!username || !password) {
    //   Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
    //   return;
    // }

    setLoading(true);

    // Fake API login (mô phỏng server)
    setTimeout(() => {
      setLoading(false);
      // if (username === 'admin' && password === '123456') {
      //   Alert.alert('Thành công', 'Đăng nhập thành công!');
      // } else {
      //   Alert.alert('Lỗi', 'Tên đăng nhập hoặc mật khẩu không đúng');
      // }
    }, 1000);
    navigate('id-capture')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingLeft: 10, marginBottom: 15 },
  button: { width: '100%', height: 50, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});