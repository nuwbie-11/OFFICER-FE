import React, { useEffect, useState } from 'react'
import { deleteData, listData } from './api';
import { BsFillPencilFill, BsTrash3Fill } from "react-icons/bs";
import { debounce } from 'react-axios/lib/utils';
import { instance } from '../../utils/api';
import DataTable from 'react-data-table-component';
import Loading from '../../components/loading';
import { Link, useNavigate } from 'react-router-dom';
import ModalConfirm from '../../components/modal';

function Provinsi() {
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);
  const [row, setRow] = useState();
  const [keyword, setKeyword] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [selectedRow, setSelectedRow] = useState()

  useEffect(() => {
    if (!isLoading) setIsLoading(true)
    const objListData = listData(`?q=${keyword}`)
    debounce(() => instance.request(objListData).then((response) => {

      setRow(response.data.data)
    }).catch((err) => console.warn(err)).finally(() => setIsLoading(false))
      , 500)();
  }, [keyword])

  function handleCloseModal() {
    setShowModal(false);
  }

  function onConfirmDelete() {
    setShowModal(false)
    if (!isLoading) setIsLoading(true)
    const objDeleteData = deleteData(selectedRow)
    instance.request(objDeleteData).then((response) => {
      navigate(0)
    }).catch((err) => console.warn(err)).finally(() => setIsLoading(false))
  }

  const columns = [
    {
      name: "#",
      selector: row => row.index,
      sortable: false,
      button: true,
    },
    {
      name: 'Nama Provinsi',
      selector: row => row.nama_provinsi,
      sortable: true,
      id: 'nama_provinsi',
      cell: (row) => (
        row.nama_provinsi
      )
    },
    {
      name: 'Nama Gubernur',
      sortable: true,
      id: 'nama_gubernur',
      selector: row => row.nama_gubernur
    },
    {
      name: 'Deskripsi',
      sortable: true,
      id: 'deskripsi',
      selector: row => row.deskripsi
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className='flex gap-x-2'>
          <Link to={`/provinsi/edit/${row.id}`} state={{ paramId: row.id, action: 'Edit' }}>
            <button className='bg-orange-500 text-white p-2 rounded'>
              <BsFillPencilFill />
            </button>
          </Link>
          <button className='bg-red-600 text-white p-2 rounded' onClick={() => {
            setShowModal(true)
            setSelectedRow(row.id)
          }}>
            <BsTrash3Fill />
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
            text="Anda Yakin ingin Menghapus ?"
            onClose={handleCloseModal}
            onConfirm={onConfirmDelete}
          />
      }

      <div className="min-h-[100dvh] bg-zinc-100 py-12">
        <div className="content-wrapper bg-white rounded mx-12 px-5">
          <div className="pt-5 mb-1">
            <h1 className='font-semibold text-2xl'>Provinsi</h1>
          </div>
          <div className="flex justify-between items-center">
          <div className="pt-1 mb-4 w-1/4">
            <input type="text" onChange={(e) => setKeyword(e.target.value)} placeholder='Search' id="keyword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   " required />
          </div>

            <Link to={'/provinsi/create'} state={{ action: 'Create' }}>
              <button className="px-3 py-1 bg-blue-500 text-zinc-50 rounded">
                Add
              </button>
            </Link>
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

export default Provinsi