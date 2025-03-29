// File: navigation/AppNavigator.tsx
import LoginScreen from '@/app/login';
import FaceCaptureScreen from '@/app/face-capture';
import HomeScreen from '@/app/home';
import IDCaptureScreen from '@/app/id-capture';
import PinRegistrationScreen from '@/app/register-pin';
import PinVerificationScreen from '@/app/smart-otp-register';
import RegistrationSuccessScreen from '@/app/success-account';
import TransactionSuccessScreen from '@/app/success-transaction';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SmartOTPScreen from '@/app/verify-smart-otp';
import FaceRegisterTransaction from '@/app/face-register-transaction';
import TransactionMethodScreen from '@/app/transaction-register';
import AuthScreen from '@/app/default';
import RegisterAccountScreen from '@/app/resgister-account';
import IDCardResultScreen from '@/app/id-result';
import TransferBankScreen from '@/app/transfer-bank';
import TransferBankConfirm from '@/app/confirm-transfer';
import TransferSuccess from '@/app/transfer-bank';
import TransferConfirmFace from '@/app/transfer-confirm-face';
import TransferConfirmOTP from '@/app/transfer-confirm-otp';
import TransferSendOTP from '@/app/tranfer-send-otp';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator initialRouteName="Default">
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="FaceCapture" component={FaceCaptureScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="FaceRegister" component={FaceRegisterTransaction} />
            <Stack.Screen name="IdCapture" component={IDCaptureScreen} />
            <Stack.Screen name="SuccessAccount" component={RegistrationSuccessScreen} />
            <Stack.Screen name="RegisterPin" component={PinRegistrationScreen} />
            <Stack.Screen name="TransactionRegister" component={TransactionMethodScreen} />
            <Stack.Screen name="SmartOtpRegister" component={PinVerificationScreen} />
            <Stack.Screen name="SuccessTransaction" component={TransactionSuccessScreen} />
            <Stack.Screen name="VerifySmartOtp" component={SmartOTPScreen} />
            <Stack.Screen name="Default" component={AuthScreen} />
            <Stack.Screen name="RegisterAccount" component={RegisterAccountScreen} />
            <Stack.Screen name="IdCardResult" component={IDCardResultScreen} />
            <Stack.Screen name="TransferBank" component={TransferBankScreen} />
            <Stack.Screen name="TransferBankConfirm" component={TransferBankConfirm} />
            <Stack.Screen name="TransferBankSuccess" component={TransferSuccess} />
            <Stack.Screen name="TransferConfirmFace" component={TransferConfirmFace} />
            <Stack.Screen name="TransferConfirmOTP" component={TransferConfirmOTP} />
            <Stack.Screen name="TransferSendOTP" component={TransferSendOTP} />
        </Stack.Navigator>
    );
}