import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { approveLog, listLog, log, readUser } from '../api';
import { debounce } from 'react-axios/lib/utils';
import { instance } from '../../../utils/api';
import { BsCheckLg, BsFillPencilFill, BsTrash3Fill, BsXLg } from 'react-icons/bs';
import DataTable from 'react-data-table-component';
import Loading from '../../../components/loading';
import ModalConfirm from '../../../components/modal';

function HarianLogTable() {
    const navigate = useNavigate();
    const activeUser = JSON.parse(localStorage.getItem('user-info'))

    const [level, setLevel] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [row, setRow] = useState();
    const [keyword, setKeyword] = useState("is_pending=yes")
    const [showModal, setShowModal] = useState(false)
    const [selectedRow, setSelectedRow] = useState()
    const [modalMessage, setModalMessage] = useState("")
    const [action, setAction] = useState('approve')

    useEffect(() => {
        if (!activeUser || activeUser.level !== 'admin') {
            localStorage.removeItem('user-info')
            navigate('/daily-log/login')
        } else {
            setLevel(activeUser.level)
        }
    }, [isLoading])

    const getLog = useCallback(() => {
        if (!isLoading) setIsLoading(true)
        const objListData = listLog(`?${keyword}`)
        instance.request(objListData).then((response) => {
            setRow(response.data.data)
        }).catch((err) => console.warn(err)).finally(() => setIsLoading(false))
    }, [keyword])

    useEffect(() => {
        debounce(getLog, 500)();
    }, [getLog])

    function handleCloseModal() {
        setShowModal(false);
    }

    function handleLog() {
        setIsLoading(true)
        const objDetailData = log(JSON.stringify({ 'user_id': activeUser.id }))
        instance.request(objDetailData).then((response) => {

        }).catch((err) => console.warn(err)).finally(() => setIsLoading(false))
    }

    function onConfirm() {
        setIsLoading(true)
        setShowModal(false)
        let objRequest
        if (action === 'approve') {
            objRequest = approveLog(JSON.stringify({
                'is_approved': 'yes'
            }), selectedRow)
        } else {
            objRequest = approveLog(JSON.stringify({
                'is_rejected': 'yes'
            }), selectedRow)
        }

        instance.request(objRequest).then((response) => {
            setShowModal(false)
            setModalMessage("")
            setAction()
            setSelectedRow()
            getLog()
        }).catch((err) => console.warn(err)).finally(() => setIsLoading(false))
    }

    useEffect(() => {
        console.log(level)
    }, [level])

    const columns = [
        {
            name: "#",
            selector: row => row.index,
            sortable: false,
            button: true,
        },
        {
            name: 'Nama',
            selector: row => row.name,
            sortable: true,
            id: 'name',
            cell: (row) => (
                row.name
            )
        },
        {
            name: 'Logged At',
            sortable: true,
            id: 'nama_gubernur',
            selector: row => row.log_at
        },
        {
            name: 'Action',
            cell: (row) => (
                <div className='flex gap-x-2'>

                    <button className='bg-green-500 text-white p-2 rounded' onClick={() => {
                        setShowModal(true)
                        setModalMessage("Anda Yakin ingin Menyetujui ?")
                        setAction('approve')
                        setSelectedRow(row.id)
                    }}>
                        <BsCheckLg />
                    </button>

                    <button className='bg-red-600 text-white p-2 rounded' onClick={() => {
                        setShowModal(true)
                        setModalMessage("Anda Yakin ingin Menolak ?")
                        setAction('reject')
                        setSelectedRow(row.id)
                    }}>
                        <BsXLg />
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ]

    const data = row?.map((item, ix) => ({ ...item, index: ix + 1 }))
    return (
        <>
            {
                !showModal ? null :
                    <ModalConfirm
                        text={modalMessage}
                        onClose={handleCloseModal}
                        onConfirm={onConfirm}
                    />
            }

            <div className="min-h-[100dvh] bg-zinc-100 py-12">
                <div className="content-wrapper bg-white rounded mx-12 px-5">
                    <div className="pt-5 mb-1">
                        <h1 className='font-semibold text-2xl'>Daily Log Admin</h1>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="pt-1 mb-4 w-1/4">
                            <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Search' id="keyword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " required />
                        </div>
                        <div className="flex gap-x-2">
                            <button className="px-3 py-1 bg-red-500 text-zinc-50 rounded" onClick={() => {
                                localStorage.removeItem('user-info')
                                navigate('/daily-log/login')
                            }}>
                                Logout
                            </button>
                        </div>


                    </div>
                    <div className="table-wrapper  rounded py-2 ">
                        <DataTable
                            columns={columns}
                            data={data}
                            progressPending={isLoading && !!row}
                            progressComponent={<Loading variant='mini' />}
                            striped
                            pagination
                        >

                        </DataTable>

                    </div>

                </div>
            </div>
        </>
    )
}

export default HarianLogTable