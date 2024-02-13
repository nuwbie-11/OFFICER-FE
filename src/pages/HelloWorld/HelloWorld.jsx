import React, { useEffect, useState } from 'react'
import { getGreetings, helloWorld } from './api'
import { debounce } from 'react-axios/lib/utils';
import { instance } from '../../utils/api';
import { Form, useForm } from 'react-hook-form';

function HelloWorld() {
    const { register, handleSubmit, setValue } = useForm()

    const [data, setData] = useState()
    const [messege,setMessege] = useState()

    function onSubmit(data) {
        if (data.number <= 0) {
            setData()
            setMessege("Please input more than 0")
            return 0
        }
        const objHelloWorld = helloWorld(JSON.stringify({ number: data.number }))
        debounce(() => instance.request(objHelloWorld).then((response) => {
            setData(response.data.message)
        }).catch((err) => console.warn(err))
            , 500)();
    }

    return (
        <div className="flex flex-col items-center gap-y-8 py-12 min-h-[100dvh] bg-zinc-100">
            <h1 className='font-semibold text-lg'>Hello World Function </h1>
            <div className="description-wrapper">
                <ul className='list-disc'>
                <p>
                    Fungsi <span className='font-mono'>helloworld(n)</span> , yang mengembalikan bilangan 1 ke-n.
                    Dengan kondisi sebagai berikut

                </p>
                    <li>
                        Jika n kelipatan 4, tampilkan kata <span className='font-mono text-yellow-300 bg-slate-800 px-2'>hello</span>
                    </li>
                    <li>
                        Jika n kelipatan 5, tampilkan kata <span className='font-mono text-yellow-300 bg-slate-800 px-2'>world</span>
                    </li>
                    <li>
                        Jika n kelipatan 4 & 5, tampilkan kata <span className='font-mono text-yellow-300 bg-slate-800 px-2'>helloworld</span>
                    </li>
                </ul>

            </div>
            <div className="form-wrapper flex">
                <form onSubmit={handleSubmit(onSubmit)} className='py-12 px-12 sm:px-24 bg-white rounded w-[35rem]'>
                    <label for="number" className="block mb-2 text-sm font-medium text-gray-900 ">Input Your Number</label>
                    <input type="text" onChange={(e) => setValue('number', e.target.value)} id="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " required />
                    <button type="submit" className='mt-3 px-3 py-1 bg-blue-500 rounded text-white'>Submit</button>
                </form>
            </div>
            {
                !data ? <p>{messege}</p> : (
                    <div className='result-wrapper flex gap-x-5 gap-y-4 bg-zinc-800 px-12 py-10 rounded text-wrap flex-wrap mx-24'>
                        {
                            data && data.map((item, ix) => (
                                <div key={ix} className='flex flex-col gap-y-1 text-center'>
                                    <pre className='text-indigo-600 text-lg'>{item}</pre>
                                    <pre className='text-xs text-orange-400'>{ix + 1}</pre>
                                </div>
                            ))
                        }
                    </div>

                )
            }
        </div>
    )
}

export default HelloWorld