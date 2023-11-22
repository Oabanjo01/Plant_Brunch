import {Colors} from '@app/constants/colors';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: Colors.primaryTextColor,
          fontSize: 30,
          fontFamily: 'OpenSans-SemiBold',
          marginBottom: 6,
        }}>
        Hello
      </Text>
      <Text>Let’s Learn More About Plants</Text>
      <View>
        <TextInput placeholder="Username" selectionColor={Colors.primary} />
        <TextInput placeholder="Password" />
      </View>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: '14%',
    marginLeft: '7%',
  },
});
export default LoginScreen;
