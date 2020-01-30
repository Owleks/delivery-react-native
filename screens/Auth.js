import React, {useState} from 'react';
import { ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Button} from 'react-native';


import Card from "../components/Card";
import Input from "../components/Input";

const LinksScreen = ({navigation}) => {
  const [username, changeUsername ] = useState('');
  const [password, changePassword ] = useState('');
  const loginAction = () => {
    navigation.navigate({
      routeName: 'Menus'
    })
  };
  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView>
      <Card style={styles.card}>
        <Text>
          Please login
        </Text>
        <Input
          label="Username"
          value={username}
          onChange={changeUsername}
          autoCapitalize="none"
          autoCompleteType="username"
          autoCorrect={false}
          autoFocus
          textContentType="username"
        />
        <Input
          label="Password"
          value={password}
          onChange={changePassword}
          autoCapitalize="none"
          autoCompleteType="password"
          autoCorrect={false}
          textContentType="password"
          secureTextEntry
        />
        <Button
          title="LOGIN"
          onPress={loginAction}
        />
      </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'AUTH',
};

const styles = StyleSheet.create({
  container: {
  //   flex: 1,
  //   paddingTop: 15,
  //   backgroundColor: '#fff',
  },
  card: {
    padding: 30
  }
});

export default LinksScreen;