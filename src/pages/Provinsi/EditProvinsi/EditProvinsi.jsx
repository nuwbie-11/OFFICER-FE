import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { BiArrowBack } from "react-icons/bi";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { createData, readData, updateData } from '../api';
import { instance } from '../../../utils/api';

function EditProvinsi() {
    const location = useLocation();
    const navigate = useNavigate();

    const { paramId, action } = location.state || {};
    const { register, handleSubmit, setValue, reset } = useForm()

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (!isLoading) setIsLoading(true)
        if (action === 'Edit') return 0;
        const objReadData = readData(paramId)
        instance.request(objReadData).then((response) => {
            reset(
                {
                    nama_provinsi: response?.data?.data?.nama_provinsi,
                    nama_gubernur: response?.data?.data?.nama_gubernur,
                    deskripsi: response?.data?.data?.deskripsi,
                }
            )
        })
    }, [])

    function onSubmit(data) {
        let objRequest
        setIsLoading(true)
        if (action === 'Edit') {
            objRequest = updateData(JSON.stringify(data),paramId)
            
        } else {
            objRequest = createData(JSON.stringify(data))
        }
        
        instance.request(objRequest).then((response)=>{
            navigate('/provinsi')
        }).catch((err)=>console.warn(err)).finally(()=>setIsLoading(false))
    }

    return (
        <div className="flex flex-col items-center pt-24 gap-y-8  min-h-[100dvh] bg-zinc-100">
            <div className="rounded bg-white py-12 px-10 ">
                <div className="flex gap-x-5 items-center">
                    <Link to={'/provinsi'}>
                        <button className='hover:scale-110 transition-all'>
                            <BiArrowBack />
                        </button>

                    </Link>
                    <h1 className='text-semibold text-3xl'> {action} Provinsi </h1>
                </div>
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit(onSubmit)} className='py-12 sm:px-10 bg-white rounded w-[35rem] flex flex-col gap-y-5'>
                        <input placeholder='Nama Provinsi' type="text" {...register('nama_provinsi')} onChange={(e) => setValue('nama_provinsi', e.target.value)} id="nama_provinsi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5   " required />

                        <input placeholder='Nama Gubernur' type="text" {...register('nama_gubernur')} onChange={(e) => setValue('nama_gubernur', e.target.value)} id="nama_gubernur" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5   " required />

                        <input placeholder='Deskripsi' type="text" {...register('deskripsi')} onChange={(e) => setValue('deskripsi', e.target.value)} id="deskripsi" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5   " />

                        <button type="submit" className='mt-3 px-3 py-1 bg-blue-500 rounded text-white w-1/4'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditProvinsi