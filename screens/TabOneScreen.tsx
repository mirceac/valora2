import { StyleSheet, Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { walletActions } from "../store/actions/walletActions";
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  // This function calls up the connect function from the walletAction Action
  const login = () => {
    dispatch(walletActions.connect(navigation));
  };

  const logout = () => {
    dispatch(walletActions.disconnect());
  };

  return (
    <View style={styles.container}>
      <div>
        <Button onPress={login} title="Connect Wallet"></Button>
        <Button onPress={logout} title="Disconnect Wallet"></Button>
      </div>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

