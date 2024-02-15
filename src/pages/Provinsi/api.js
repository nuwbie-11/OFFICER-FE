export { listData, createData, readData, updateData, deleteData }

function listData(params) {
    const objList = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/list${params}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    return objList
}

function createData(data) {
    const objList = {
        method: 'post',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/create`,
        headers: {
            'Content-Type': 'application/json',
        },
        data: data
    }

    return objList
}

function readData(id) {
    const objList = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/read/${id}`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    return objList
}

function updateData(data, id) {
    const objList = {
        method: 'put',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/update/${id}`,
        headers: {
            'Content-Type': 'application/json',

        },
        data: data
    }

    return objList
}

function deleteData(id) {
    const objList = {
        method: 'delete',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/delete/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }

    return objList
}