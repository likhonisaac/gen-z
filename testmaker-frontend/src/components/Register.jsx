import { useRef, useEffect, useState } from "react";
import StarBG from './StarBG';
import { motion } from 'framer-motion';
import RegistrationError from "./RegistrationError";
import RegistrationSuccessful from "./RegistrationSuccessful";

import { useRegisterMutation } from '../features/auth/authApiSlice'
import { Link } from 'react-router-dom'
import Loader from "./Loader";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation();

    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [usernameFocus, setUsernameFocus] = useState(false)

    const [firstname, setFirstname] = useState('')
    const [validFirstname, setValidFirstname] = useState(false)
    const [firstnameFocus, setFirstnameFocus] = useState(false)

    const [lastname, setLastname] = useState('')
    const [validLastname, setValidLastname] = useState(false)
    const [lastnameFocus, setLastnameFocus] = useState(false)

    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [passwordFocus, setPasswordFocus] = useState(false)

    const [matchPassword, setMatchPassword] = useState('')
    const [validMatchPassword, setValidMatchPassword] = useState(false)
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)
    const roles = "Parent"

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
        setValidMatchPassword(password === matchPassword)
    }, [password, matchPassword])

    useEffect(() => {
        setValidFirstname(firstname.length > 0)
    }, [firstname])

    useEffect(() => {
        setValidLastname(lastname.length > 0)
    }, [lastname])

    const canSave = [validMatchPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        setLoading(true);
        e.preventDefault()
        if (canSave) {
            await register({
                username: username,
                password: password,
                first_name: firstname,
                last_name: lastname
            })
        }
        setLoading(false);
    }

    return (
        <div className="flex overflow-hidden p-5 pb-20 h-full w-full bg-gradient-to-b from-teal-500 via-teal-400 to-blue-500 items-center justify-center">
            <div className="absolute flex h-full items-center justify-center z-20">
                {isSuccess ?
                    <RegistrationSuccessful /> : null}
            </div>

            <div className="absolute flex h-full items-center justify-center z-20">
                {isError ?
                    (error.status === 409) ?
                        <RegistrationError messageerror={`Username ${username} is already taken. Choose another.`} /> : <RegistrationError messageerror="Registration Failed. Try Again." />
                    : null}
            </div>

            <div className="flex flex-col items-center justify-center gap-2 w-[500px] overflow-hidden">
                <Link to="/" className="flex items-center text-5xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="./logo.svg" alt="logo" />
                    Stud<span style={{ color: "#FF7D7D" }}>.AI</span>
                </Link>
                <div className="w-full rounded-lg shadow dark:border grow bg-gray-800 border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-2 sm:p-4">
                        <h1 className="text-center font-bold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                            Sign Up for Stud.AI
                        </h1>
                        <form className="space-y-4" onSubmit={onSaveUserClicked}>
                            <div>
                                <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={firstname}
                                    onChange={e => setFirstname(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your first name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={lastname}
                                    onChange={e => setLastname(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your last name"
                                    required=""
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Username"
                                    required=""
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="••••••••"
                                    value={matchPassword}
                                    onChange={e => setMatchPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>
                            {!validMatchPassword ? <p className="text-red-600" >Passwords Do Not Match</p> : null}

                            {loading ?
                                <div className="flex w-full items-center justify-center">
                                    <Loader />
                                </div> :
                                <motion.button
                                    className="w-full text-white bg-gradient-to-r from-pink-500 to-teal-500 hover:to-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Register
                                </motion.button>}

                        </form>

                        <p className="text-sm font-light text-gray-400">
                            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Log in!</Link>
                        </p>
                        <p className="text-sm font-light text-gray-400">
                                Note that it make take a while for the backend to load on initial query.
                        </p>
                    </div>
                </div>
            </div>


            

        </div>
    );
};

export default Register;