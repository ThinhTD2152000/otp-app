import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { post } from '../fetch/useApi';

const RegisterAccountScreen = () => {
    const [form, setForm] = useState<any>({
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState<any>(false);

    const navigation = useNavigation();

    // Validate nâng cao từng trường
    const validateField = (name: any, value: any) => {
        let error = '';

        switch (name) {
            case 'username':
                if (!value) error = 'Vui lòng nhập tên đăng nhập';
                else if (value.length < 6) error = 'Tên đăng nhập ít nhất 6 ký tự';
                else if (!/^[a-zA-Z0-9_]+$/.test(value)) error = 'Không chứa ký tự đặc biệt';
                break;
            case 'email':
                if (!value) error = 'Vui lòng nhập email';
                else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Email không hợp lệ';
                break;
            case 'phoneNumber':
                if (!value) error = 'Vui lòng nhập số điện thoại';
                else if (!/^\d{10,11}$/.test(value)) error = 'Số điện thoại 10-11 số';
                break;
            case 'password':
                if (!value) error = 'Vui lòng nhập mật khẩu';
                else if (value.length < 8) error = 'Mật khẩu ít nhất 8 ký tự';
                else if (!/[A-Z]/.test(value)) error = 'Cần ít nhất 1 chữ hoa';
                else if (!/[0-9]/.test(value)) error = 'Cần ít nhất 1 số';
                break;
            case 'confirmPassword':
                if (!value) error = 'Vui lòng xác nhận mật khẩu';
                else if (value !== form.password) error = 'Mật khẩu không khớp';
                break;
        }

        return error;
    };

    // Xử lý thay đổi text và validate real-time
    const handleChange = (name: any, value: any) => {
        setForm((prev: any) => ({ ...prev, [name]: value }));

        // Clear error khi người dùng bắt đầu nhập
        if (errors[name]) {
            setErrors((prev: any) => ({ ...prev, [name]: '' }));
        }
    };

    // Validate toàn bộ form
    const validateForm = () => {
        const newErrors: any = {};
        let isValid = true;

        Object.keys(form).forEach((key: any) => {
            const error: any = validateField(key, form[key]);
            if (error) {
                newErrors[key] = error;
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;

        const { confirmPassword, ...newData } = form;

        setIsSubmitting(true);

        try {
            await post('/auth/register', newData, {})
            Alert.alert('Thành công', 'Tài khoản đã được tạo!', [
                { text: 'OK', onPress: () => (navigation as any).navigate('Login') }
            ]);
        } catch (error: any) {
            Alert.alert('Lỗi', error.message || 'Đăng ký thất bại');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Đăng ký tài khoản</Text>

                {/* Tên đăng nhập */}
                <View>
                    <TextInput
                        style={[styles.input, errors.username && styles.inputError]}
                        placeholder="Tên đăng nhập"
                        value={form.username}
                        onChangeText={(text) => handleChange('username', text)}
                        onBlur={() => setErrors((prev: any) => ({
                            ...prev,
                            username: validateField('username', form.username)
                        }))}
                        autoCapitalize="none"
                    />
                    {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
                </View>

                {/* Email */}
                <View>
                    <TextInput
                        style={[styles.input, errors.email && styles.inputError]}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={form.email}
                        onChangeText={(text) => handleChange('email', text)}
                        onBlur={() => setErrors((prev: any) => ({
                            ...prev,
                            email: validateField('email', form.email)
                        }))}
                        autoCapitalize="none"
                    />
                    {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                </View>

                {/* Số điện thoại */}
                <View>
                    <TextInput
                        style={[styles.input, errors.phoneNumber && styles.inputError]}
                        placeholder="Số điện thoại"
                        keyboardType="phone-pad"
                        value={form.phoneNumber}
                        onChangeText={(text) => handleChange('phoneNumber', text)}
                        onBlur={() => setErrors((prev: any) => ({
                            ...prev,
                            phoneNumber: validateField('phoneNumber', form.phoneNumber)
                        }))}
                    />
                    {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
                </View>

                {/* Mật khẩu */}
                <View>
                    <TextInput
                        style={[styles.input, errors.password && styles.inputError]}
                        placeholder="Mật khẩu (ít nhất 8 ký tự, có số và chữ hoa)"
                        secureTextEntry
                        value={form.password}
                        onChangeText={(text) => handleChange('password', text)}
                        onBlur={() => setErrors((prev: any) => ({
                            ...prev,
                            password: validateField('password', form.password)
                        }))}
                    />
                    {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                </View>

                {/* Xác nhận mật khẩu */}
                <View>
                    <TextInput
                        style={[styles.input, errors.confirmPassword && styles.inputError]}
                        placeholder="Xác nhận mật khẩu"
                        secureTextEntry
                        value={form.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                        onBlur={() => setErrors((prev: any) => ({
                            ...prev,
                            confirmPassword: validateField('confirmPassword', form.confirmPassword)
                        }))}
                        onSubmitEditing={handleRegister}
                    />
                    {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
                </View>

                <TouchableOpacity
                    style={[styles.registerButton, isSubmitting && styles.disabledButton]}
                    onPress={handleRegister}
                    disabled={isSubmitting}
                >
                    <Text style={styles.registerButtonText}>
                        {isSubmitting ? 'Đang xử lý...' : 'Đăng ký'}
                    </Text>
                </TouchableOpacity>

                <View style={styles.loginPromptContainer}>
                    <Text style={styles.loginPromptText}>Bạn đã có tài khoản? </Text>
                    <TouchableOpacity onPress={() => (navigation as any).navigate('Login')}>
                        <Text style={styles.loginLink}>Đăng nhập ngay</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 8,
        backgroundColor: '#fff',
    },
    inputError: {
        borderColor: '#e74c3c',
    },
    errorText: {
        color: '#e74c3c',
        fontSize: 12,
        marginBottom: 12,
        marginLeft: 4,
    },
    registerButton: {
        backgroundColor: '#3498db',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    disabledButton: {
        opacity: 0.7,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
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

export default RegisterAccountScreen;