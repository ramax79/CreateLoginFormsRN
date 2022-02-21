import React from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {isEmpty} from 'lodash';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be between 3 and 20 characters') // тут мы задаем минимальное количество символов в 3 и отображаем сообщение если значение не валидно
    .max(20, 'Name must be between 3 and 20 characters'),
  email: yup.string().email('Invalid email').required('Email required'),
});

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
    // reValidateMode: 'onSubmit',
  });

  const submit = data => {
    console.log(data);
    reset();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={require('./assets/logo.png')} />
      <Text style={styles.title}>React Hook Form</Text>
      <Text style={styles.text}>Sign into your account here.</Text>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            // onBlur={onBlur}
            rules={{
              required: true,
            }}
            placeholder="Name"
            style={styles.input}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.error}>{errors.name?.message} </Text>

      <Controller
        control={control}
        name="email"
        render={({field: {onChange, value}}) => (
          <TextInput
            // onBlur={onBlur}
            value={value}
            placeholder="Email"
            style={styles.input}
            onChangeText={onChange}
          />
        )}
      />
      <Text style={styles.error}>{errors.email?.message} </Text>
      <TouchableOpacity
        disabled={isEmpty(errors) ? false : true}
        onPress={handleSubmit(submit)}>
        <Text
          style={{
            ...styles.button,
            backgroundColor: isEmpty(errors) ? '#c01c00' : '#999999',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
      <View style={styles.blockSignUp}>
        <Text style={styles.text}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => {}}>
          <Text style={[styles.text, {color: '#c01c00'}]}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    marginBottom: 30,
    marginTop: 16,
    color: 'white',
  },
  text: {
    fontSize: 12,
    marginBottom: 15,
    marginTop: 10,
    color: 'white',
  },
  error: {
    fontSize: 16,
    color: 'red',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 36,
    marginRight: 36,
  },
  input: {
    fontSize: 18,
    borderWidth: 1,
    padding: 12,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'white',
    // marginBottom: 16,
    // marginTop: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderColor: 'orange',
    borderWidth: 2,
    borderRadius: 100,
  },
  button: {
    fontSize: 20,
    color: 'white',
    width: 120,
    marginTop: 8,
    borderRadius: 10,
    // backgroundColor: '#c01c00',
    padding: 8,
    textAlign: 'center',
  },
  blockSignUp: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default LoginForm;
