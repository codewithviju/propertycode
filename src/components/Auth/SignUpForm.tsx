import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup';
import { getConfiguration } from '../../helpers';
import axios, { AxiosError, AxiosResponse } from 'axios';

interface ISignUpForm {
  username: string;
  email: string;
  password: string;
}

export interface IAuth {
  username: string;
  email?: string;
  password: string;
}

export interface IAuthRes {
  token: string;
  user: any;
}

const { apiUrl } = getConfiguration();

const schema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too Long!')
    .required('Username is required'),

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

interface SignUpFormProps {
  onSuccess: () => void;
}

const SignUpForm: FC<SignUpFormProps> = ({ onSuccess }) => {
  const notifyRegistration = () =>
    toast.success('You have successfully created PropertyBot account');

  const notifyFailure = (error: string) => toast.error(error);
  const history = useHistory();

  const {
    // register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISignUpForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (newUser: any) => {
    try {
      const { data } = await axios.post<IAuthRes>(
        `${apiUrl}/users/create`,
        newUser
      );
      if (data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', data.user);
        notifyRegistration();
        onSuccess();
      } else {
        notifyFailure('Error creating user');
      }
    } catch (error: any) {
      notifyFailure(error?.response?.data?.message || 'Error creating user.');
    }
  };

  const userRegistration = () => {
    history.push('/');
  };

  // useEffect(() => {})

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              className="my-4 outline-none w-full border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0"
              placeholder="Name"
              // label="Username"
            />
          )}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Form.Control
              {...field}
              className="my-4 outline-none w-full border-gray-300 border-b-2 border-t-0 border-r-0 border-l-0"
              placeholder="Email"
              // label="Email"
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
              placeholder="Password"
              // label="Password"
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
          onClick={() => {
            userRegistration();
          }}
        >
          Sign Up
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
