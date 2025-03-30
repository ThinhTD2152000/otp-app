import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { login } from '@/fetch/authAPI'

export default function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation()

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            return;
        }

        const newData = { username, password }

        setLoading(true);

        try {
            const res: any = await login(newData);


            Alert.alert(
                'Thông báo',
                'Đăng nhập thành công',
                [{
                    text: 'Tiếp tục', onPress: () => {
                        setTimeout(() => {
                            (navigation as any).replace('Home', { user: res });
                        }, 1000);
                    }
                }]
            );

        } catch (error: any) {
            Alert.alert('Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
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
            <View style={styles.loginPromptContainer}>
                <Text style={styles.loginPromptText}>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => (navigation as any).navigate('RegisterAccount')}>
                    <Text style={styles.loginLink}>Hãy đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', height: 50, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, paddingLeft: 10, marginBottom: 15 },
    button: { width: '100%', height: 50, backgroundColor: '#007bff', justifyContent: 'center', alignItems: 'center', borderRadius: 8 },
    buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

    loginPromptContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    loginPromptText: {
        color: '#666',
    },
    loginLink: {
        color: '#3498db',
        fontWeight: 'bold',
    },
});