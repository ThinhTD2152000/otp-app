import { useNavigation } from '@react-navigation/native';

export const useNavigate = () => {
  const navigation = useNavigation<any>();

  return (route: string) => {
    navigation.navigate(route);
  };
};
