// File: App.js
import AppNavigator from '@/navigation/AppNavigation';
import DismissKeyboard from '@/components/dismissKeyboard';

export default function App() {
  return (
    <DismissKeyboard>
      <AppNavigator />
    </DismissKeyboard>
  )
}