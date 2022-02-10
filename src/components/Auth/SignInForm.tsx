import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { getConfiguration } from '../../helpers';
import { IAuthRes } from './SignUpForm';

interface ISignUpForm {
  email: string;
  password: string;
}

const { apiUrl } = getConfiguration();

const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid Mail Address'
    ),

  password: Yup.string()
    .min(6, 'Too short')
    .max(30, 'Too Long!')
    .required('Password is required'),
});

toast.success({
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

interface SignInFormProps {
  onSuccess: () => void;
}
const SignUpForm: FC<SignInFormProps> = ({ onSuccess }) => {
  const notifyLogin = () => toast.success('You are successfully logged in!');

  const notifyFailure = (error: string) => toast.error(error);

  const history = useHistory();

  const {
    // login,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (loggingInUser: any) => {
    try {
      const { data } = await axios.post<IAuthRes>(
        `${apiUrl}/users/sign_in`,
        loggingInUser
      );
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        notifyLogin();
        onSuccess();
      } else {
        notifyFailure('Error signing in user');
      }
    } catch (error: any) {
      notifyFailure(error?.response?.data?.message || 'Error signing in user.');
    }
  };

  const userLogin = () => {
    history.push('/');
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              className="my-4 outline-none w-full border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0"
              placeholder="Enter Email"
              type="email"
            />
          )}
        />
        {errors.email && <p className="text-danger">{errors.email.message}</p>}
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              className="my-4 outline-none w-full border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0"
              placeholder="Enter Password"
              type="password"
            />
          )}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
        <Button
          type="submit"
          className="float-right text-white rounded-md px-3 py-2 cursor-pointer 
                      transition-all border bg-red-600 hover:bg-red-700 hover:text-white hover:border-none"
          // loading={userLoading}
          onClick={() => {
            userLogin();
          }}
        >
          Sign In
        </Button>
      </Form>
    </>
  );
};

// const CustomInput = styled(Form.Control)`
//   outline: 0;
//   width: 100%;
//   border-width: 0 0 1px;
//   border-color: silver;

//   &:focus {
//     outline: 0;
//     border-color: #020a4ddf;
//     box-shadow: none;
//   }
// `;

export default SignUpForm;
