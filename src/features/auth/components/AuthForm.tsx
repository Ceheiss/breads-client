import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../../alerts/Alert';
import { authUser } from '../actions';

type AuthFormProps = PropsFromRedux & {
    heading: any 
    buttonText: any
    signup: any
    alerts: any
    history: any
}

interface AuthFormState {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    image: any
    [k: string]: string | null
}

class AuthForm extends Component<AuthFormProps, AuthFormState> {
    constructor(props: AuthFormProps) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            password: '',
            image: null
        }
    }

    handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
        if (e.currentTarget.name === 'image' && e.currentTarget.files !== null) {
            this.setState({
                [e.currentTarget.name]: e.currentTarget.files[0]
            });
        } else { 
            this.setState({
                [e.currentTarget.name]: e.currentTarget.value
            });
        }
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const authType = this.props.signup ? 'signup' : 'signin';
        let formData: FormData | AuthFormState;
        if (authType === 'signup') {
            formData = new FormData();
            formData.append('first_name', this.state.first_name);
            formData.append('last_name', this.state.last_name);
            formData.append('email', this.state.email);
            formData.append('username', this.state.username);
            formData.append('password', this.state.password);
            formData.append('image', this.state.image);
        } else {
            formData = this.state;
        }
        
        this.props.authUser(authType, formData)
            .then(() => this.props.history.push('/'))
            .catch(() => {return});
    }

    render() {
        const { first_name, last_name, email, username, password } = this.state;
        const { heading, buttonText, signup, alerts } = this.props;

        return (
            <div className='row justify-content-md-center text-center py-5'>
                <div className='col-md-6'>
                    <form onSubmit={this.handleSubmit}>
                        <h2>{heading}</h2>
                        {alerts.message && 
                            <Alert />
                        }
                        {signup && (
                            <div>
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='first_name'>First Name:</label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='first_name'
                                            name='first_name'
                                            onChange={this.handleChange}
                                            type='text'
                                            value={first_name}
                                            required
                                        />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='last_name'>Last Name:</label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='last_name'
                                            name='last_name'
                                            onChange={this.handleChange}
                                            type='text'
                                            value={last_name}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className='form-row'>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='email'>E-mail:</label>
                                        <input
                                            autoComplete='off'
                                            className='form-control'
                                            id='email'
                                            name='email'
                                            onChange={this.handleChange}
                                            type='text'
                                            value={email}
                                            required
                                        />
                                    </div>
                                    <div className='form-group col-md-6'>
                                        <label htmlFor='image'>Image Url:</label>
                                        <input
                                            className='form-control-file'
                                            id='image'
                                            name='image'
                                            onChange={this.handleChange}
                                            type='file'
                                            accept='image/*'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='form-row'>
                            <div className='form-group col-md-6'>
                                <label htmlFor='username'>Username:</label>
                                <input
                                    autoComplete='off'
                                    className='form-control'
                                    id='username'
                                    name='username'
                                    onChange={this.handleChange}
                                    type='text'
                                    value={username}
                                    required
                                />
                            </div>
                            <div className='form-group col-md-6'>
                                <label htmlFor='password'>Password:</label>
                                <input
                                    autoComplete='off'
                                    className='form-control'
                                    id='password'
                                    name='password'
                                    onChange={this.handleChange}
                                    type='password'
                                    value={password}
                                    required
                                />
                            </div>
                        </div>
                        <button type='submit' className='btn btn-primary btn-block btn-lg'>
                            {buttonText}
                        </button>
                    </form>
                    {!signup && 
                        <Link to='/reset'>
                            <button className='btn btn-warning btn-block mt-1'>
                                Forgot Password?
                            </button>
                        </Link>
                    }
                </div>
            </div>
        )
    }
}

const connector = connect(null, { authUser });

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AuthForm);