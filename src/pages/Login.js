import axios from 'axios'
import React, { useState } from 'react'
import { environment } from '../environment';

const Login = () => {
    const apiurl = environment.apiurl;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            console.log("start")
            const res = await axios.post(
                `${apiurl}/user/login`,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
              );

            localStorage.setItem('usertoken', res.data.data);
            let token = localStorage.getItem("usertoken") ? localStorage.getItem("usertoken") : null;
            let data = token ?  JSON.parse(atob(token.split('.')[1])) : {};
            let userid = data.data._id;

            window.location.href = '/';

        } catch (error) {
            alert(error)
            console.log(error);
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                   Log in
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                            onChange={handleEmail}
                            type="email"
                            value={email}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                            onChange={handlePassword}
                            type="password"
                            value={password}
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">
                        <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <a
                        href="/signup"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Register here
                    </a>
                </p>
            </div>
        </div>
        )
}

export default Login
