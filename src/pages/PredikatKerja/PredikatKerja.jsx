import React, { useEffect, useState } from 'react'
import { PredikatKerjaImages } from '../../lib/const'
import { useForm } from 'react-hook-form'
import { kinerja } from './api'
import { debounce } from 'react-axios/lib/utils'
import { instance } from '../../utils/api'

const predikat = [
    'dibawah ekspetasi','sesuai ekspetasi','diatas ekspetasi'
]

function PredikatKerja() {
    const { register, handleSubmit, setValue } = useForm()

    const [data, setData] = useState()
    const [messege, setMessege] = useState()

    useEffect(()=>{
        setValue('perilaku','0')
        setValue('hasilKerja','0')
    },[])

    function onSubmit(data) {
        const objPredikat = kinerja(JSON.stringify(data))
        debounce(() => instance.request(objPredikat).then((response) => {
            setData(response.data)
        }).catch((err) => console.warn(err))
            , 500)();
    }

    return (
        <div className="min-h-[100dvh] bg-zinc-100 py-12">
            <div className="flex flex-col items-center gap-y-8">
                <h1 className='font-semibold text-lg'>Predikat Kinerja Function </h1>
                <div className="img-wrapper">
                    <img src={PredikatKerjaImages} className='rounded' alt="ini gambar" />
                </div>
                <div className="description-wrapper">
                    Fungsi <span className="font-mono">predikat_kinerja(hasil_kerja,perilaku)</span> agar menampilkan output sesuai matrix diatas
                </div>
                <div className="form-wrapper flex">
                    <form onSubmit={handleSubmit(onSubmit)} className='py-12 px-12 sm:px-24 bg-white rounded w-[35rem]'>
                        <label for="perilaku" className="block mb-2 text-sm font-medium text-gray-900">Pilih Perilaku</label>
                        <select id="perilaku" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 mb-5"
                            onChange={(e)=>setValue('perilaku',e.target.value)}
                            >
                            {
                                predikat.map((item,ix)=>(
                                    <option value={ix} key={ix}>{item}</option>
                                ))
                            }

                        </select>
                        
                        <label for="hasilKerja" className="block mb-2 text-sm font-medium text-gray-900">Pilih Hasil Kerja</label>
                        <select id="hasilKerja" 
                            className="bg-gray-50 border border-gray-300 text-gray-900 
                            text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block 
                            w-full p-2.5 mb-5"
                            onChange={(e)=>setValue('hasilKerja',e.target.value)}
                            >
                            {
                                predikat.map((item,ix)=>(
                                    <option value={ix} key={ix}>{item}</option>
                                ))
                            }

                        </select>
                        <button type="submit" className='mt-3 px-3 py-1 bg-blue-500 rounded text-white'>Submit</button>
                    </form>
                </div>
                {
                !data ? <p>{messege}</p> : (
                    <div className='result-wrapper flex gap-x-5 gap-y-4 bg-zinc-800 px-8 py-5 rounded text-wrap flex-wrap mx-24'>
                        {

                                <div  className='flex flex-col gap-y-1 text-center'>
                                    <pre className='text-yellow-600 text-lg'>{data.message}</pre>
                                </div>
                        }
                    </div>

                )
            }
            </div>
        </div>
    )
}

export default PredikatKerja