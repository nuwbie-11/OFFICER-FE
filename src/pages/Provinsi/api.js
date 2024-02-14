export { listData, createData, readData, updateData, deleteData }

function listData(params) {
    const objList = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/list${params}`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        }
    }

    return objList
}

function createData(data) {
    const objList = {
        method: 'post',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/create`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
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
            "Access-Control-Allow-Credentials": true,
        }
    }

    return objList
}

function updateData(data, id) {
    const objList = {
        method: 'put',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/provinsi/update/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,

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
            "Access-Control-Allow-Credentials": true,
        },
    }

    return objList
}