import React from 'react'
import { menus } from './columns'
import { Link } from 'react-router-dom'

function LandingPage() {
    return (
        <div className="min-h-[100dvh] bg-zinc-100 py-12">
            <div className="flex justify-center mb-12">
                <h1>This Web is provided for Test on PT. Tatacipta Teknologi Indonesia as Programmer</h1>
            </div>
            <div className=" rounded grid grid-cols-2 justify-items-center gap-y-12 py-12">
                {
                    menus.map((item, ix) =>
                    (
                        <>
                            <div className="card-wrapper bg-zinc-50 py-6 w-[35rem] rounded">
                                <div className="flex items-center flex-col gap-y-2">
                                    <h1 className="text-xl font-semibold">
                                        {item.name}
                                    </h1>
                                    <div className="px-5 w-full text-wrap text-center">
                                        <p>
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="flex justify-start">
                                        <Link to={item.url}>
                                            <button type="button" className='px-4 py-2 text-white bg-red-500 hover:scale-110 transition-all rounded'>
                                                Try Now !!
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            </div>
                        </>
                    )
                    )
                }
            </div>
        </div>
    )
}

export default LandingPage