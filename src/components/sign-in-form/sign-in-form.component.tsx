import { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { AuthError, AuthErrorCodes } from 'firebase/auth'

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { UserContext } from "../../context";

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const { userData, signInWithEmail, sigInWithGoogle } = useContext(UserContext)
  const [ formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
      await sigInWithGoogle()
  };

  const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await signInWithEmail( { email, password })
      resetFormFields();
    } catch (error) {
      console.log('user sign in failed', error as AuthError);
    }
  };

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={ e => handleSubmit(e)}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
          <Button
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Google
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
