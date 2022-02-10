import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { getConfiguration } from '../../helpers';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
}

const schema = Yup.object().shape({
  firstName: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too Long!')
    .required('First Name is required')
    .matches(/^[A-Za-z0-9_-]+$/, 'Invalid Firstname'),

  lastName: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too Long!')
    .required('Last Name is required')
    .matches(/^[A-Za-z0-9_-]+$/, 'Invalid Lastname'),

  number: Yup.string()
    .min(4, 'Too short')
    .max(30, 'Too Long!')
    .required('number is required'),

  email: Yup.string()
    .required('Email is required')
    .matches(
      /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid Mail Address'
    ),
});

const Investment: FC = () => {
  const {
    // investment,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: yupResolver(schema),
  });
  const { apiUrl } = getConfiguration();

  const notifySuccess = () => toast.success('Succesfully subscribed!');

  const notifyFailure = (error: string) => toast.error(error);

  const onSubmit = async (data: any) => {
    console.log(data);
    try {
      await axios.post(`${apiUrl}/users/subscribe`, data);
      notifySuccess();
    } catch (error: any) {
      notifyFailure('Error subscribing.');
    }
  };
  return (
    <>
      <div className="Investment h-screen flex flex-col justify-between">
        <div className="xl:container py-36 px-8">
          <div className="w-full flex flex-col md:flex-row">
            <div className="w-full xl:w-1/2 flex justify-center items-center ">
              <div className="space-y-4">
                <h2 className="text-3xl uppercase font-normal">
                  Join PropertyBot's <br />
                  Investment Property Lead <br />
                  List
                </h2>
                <p className="text-xl w-3/4">
                  Sign up to receive periodic emails product updates and to stay
                  in the loop.
                </p>
              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <div className="Investment__contact">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Form.Group className="my-3">
                    <Form.Label>First Name *</Form.Label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          className="my-2"
                          // label="firstName"
                        />
                      )}
                    />
                    {errors.firstName && (
                      <small className="text-danger">
                        {errors.firstName.message}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Last Name*</Form.Label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          className="my-2"
                          // label="lastName"
                        />
                      )}
                    />
                    {errors.lastName && (
                      <small className="text-danger">
                        {errors.lastName.message}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Email *</Form.Label>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          className="my-2"
                          // label="Email"
                          type="email"
                        />
                      )}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  </Form.Group>

                  <Form.Group className="my-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Controller
                      name="number"
                      control={control}
                      render={({ field }) => (
                        <Form.Control
                          {...field}
                          className="my-2"
                          // label="number"
                          type="number"
                        />
                      )}
                    />
                    {errors.email && (
                      <small className="text-danger">
                        {errors.email.message}
                      </small>
                    )}
                  </Form.Group>

                  <button
                    type="submit"
                    className="float-end custom__btn custom__btn--primary"
                  >
                    Join
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 p-5 bg-black text-white ">
          <div className="container">
            <div className="row">
              <div className="d-flex flex-column justify-content-between col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <div className="d-flex flex-column">
                  <span>PropertyBot&copy; </span>
                  <span className="my-3"></span>
                </div>
                <div>
                  <span>
                    &copy;Copyright 2021 PropertyBot, Inc. All Rights Reserved.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Investment;
