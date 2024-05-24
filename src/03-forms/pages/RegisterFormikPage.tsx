import '../styles/styles.css'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { MyTextInput } from '../components'

export const RegisterFormikPage = () => {

    //nombre: minomo, 2 letras, max 15, requerido; email: requerido
    //password: minimo 6, y el repeat password, = a password
    return (
        <div>
            <h1>RegisterFormikPage</h1>

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password1: '',
                    password2: ''
                }}
                onSubmit={(values) => {
                    console.log('formik values')
                    console.log(values)
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                            .required('Mandatory field')
                            .min(2, 'Field must have more than 2 characters')
                            .max(15, 'Field must not have more than 15 characters'),
                        email: Yup.string()
                            .email('Email format invalid')
                            .required('Mandatory field'),
                        password1: Yup.string()
                            .required('Mandatory field')
                            .min(2, 'Field must have more than 2 characters'),
                        password2: Yup.string()
                            .oneOf([Yup.ref('password1')], 'Passwords are not equal')
                            .required('Field mandatory field')
                    })
                }
            >
                {
                    ({handleReset}) => (
                        <Form noValidate>
                            <MyTextInput
                                label='Name'
                                name='name'
                                placeholder='Name'
                            />

                            <MyTextInput
                                label='Email'
                                name='email'
                                placeholder='email@aol.com'
                            />

                            <MyTextInput
                                label='Password'
                                name='password1'
                                placeholder='******'
                                type='password'
                            />

                            <MyTextInput
                                label='Repeat Password'
                                name='password2'
                                placeholder='******'
                                type='password'
                            />

                            <button type="submit">Create</button>
                            <button type="button" onClick={() => handleReset()}>Reset Form</button>
                        </Form>
                    )
                }
            </Formik>




        </div>
    )
}
