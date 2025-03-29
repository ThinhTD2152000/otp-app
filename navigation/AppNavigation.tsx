// File: navigation/AppNavigator.tsx
import LoginScreen from '@/app/auth/login';
import HomeScreen from '@/app/home';
import PinVerificationScreen from '@/app/registerTransaction/transactionOTP/smart-otp-register';
import RegistrationSuccessScreen from '@/app/verfiyAccount/success-account';
import TransactionSuccessScreen from '@/app/registerTransaction/success-transaction';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SmartOTPScreen from '@/app/registerTransaction/transactionOTP/verify-smart-otp';
import FaceRegisterTransaction from '@/app/registerTransaction/transactionFace/face-register-transaction';
import TransactionMethodScreen from '@/app/registerTransaction/transaction-register';
import AuthScreen from '@/app/default';
import RegisterAccountScreen from '@/app/auth/register-account';
import TransferBankScreen from '@/app/transferBank/transfer-bank';
import TransferBankConfirm from '@/app/transferBank/transferConfirm/confirm-transfer';
import TransferSuccess from '@/app/transferBank/transfer-bank';
import TransferConfirmFace from '@/app/transferBank/transferConfirm/transfer-confirm-face';
import TransferConfirmOTP from '@/app/transferBank/transferConfirm/transfer-confirm-otp';
import TransferSendOTP from '@/app/transferBank/transferConfirm/tranfer-send-otp';
import FaceCaptureScreen from '@/app/verfiyAccount/faceCapture/face-capture';
import IDCaptureScreen from '@/app/verfiyAccount/ipCapture/id-capture';
import PinRegistrationScreen from '@/app/verfiyAccount/registerPIN/register-pin';
import IDCardResultScreen from '@/app/verfiyAccount/ipCapture/id-result';
import FaceCaptureSuccess from '@/app/verfiyAccount/faceCapture/face-capture-success';

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
            <Stack.Screen name="FaceCaptureSuccess" component={FaceCaptureSuccess} />
        </Stack.Navigator>
    );
}