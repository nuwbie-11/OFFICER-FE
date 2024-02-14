import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';

import { useLocation, useNavigate } from 'react-router-dom';
import { login } from './api';
import { instance } from '../../utils/api';

function Login() {
    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, reset } = useForm()

    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(true)

    function onSubmit(data) {
        let objRequest
        setIsLoading(true)
        if (isLogin) {
            console.log(data)
        }
        objRequest = login(JSON.stringify(data))
        instance.request(objRequest).then((response) => {
            if (response.status === 200) {
                localStorage.setItem('user-info',JSON.stringify(response.data.data))
            }
            console.log(response.data.data)
        }).catch((err)=>console.warn(err)).finally(()=>{
            setIsLoading(false)
        })
    }

    useEffect(()=>{
        if (JSON.parse(localStorage.getItem('user-info')) !== null) {
            const level = JSON.parse(localStorage.getItem('user-info')).level
            if(level === 'admin') navigate('/daily-log')
            if(level !== 'admin') navigate('/daily-log/staff')
        }
    },[isLoading])


    return (
        <div className="min-h-[100dvh] bg-zinc-100 py-12">
            <div className="flex justify-center items-center">
                <div className="flex flex-col h-[25rem] w-[35rem] m-12 bg-white rounded p-8">
                    <h1 className="font-semibold text-2xl">{isLogin ? 'Login' : 'Register'}</h1>
                    <div className="form-wrapper">
                        <form onSubmit={handleSubmit(onSubmit)} className='py-12 flex flex-col gap-y-5'>

                            {
                                isLogin ?? (<input placeholder='Nama' type="text" onChange={(e) => setValue('name', e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" required />
                                )
                            }

                            <input placeholder='Email' type='email' onChange={(e) => setValue('email', e.target.value)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" required />

                            <input placeholder='Password' type="password" onChange={(e) => setValue('password', e.target.value)} id="deskripsi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5" required />

                            <button type="submit" className='mt-3 px-3 py-1 bg-blue-500 rounded text-white w-1/4'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login