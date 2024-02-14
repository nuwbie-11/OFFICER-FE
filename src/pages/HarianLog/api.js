export { login, register, readUser, log, listLog, approveLog }

function login(data) {
    const objLogin = {
        method: 'post',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/user/auth`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    }
    return objLogin;
}

function register(data) {
    const objLogin = {
        method: 'post',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/user/create`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    }
    return objLogin;
}



function readUser(id) {
    const objList = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/user/read/${id}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return objList;
}

function listLog(params) {
    const objList = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/daily-log/list${params}`,
        headers: {
            'Content-Type': 'application/json',
        },
    }
    return objList;
}

function approveLog(data, id) {
    const objRequest = {
        method: 'put',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/daily-log/approve/${id}`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    }
    return objRequest
}

function log(data) {
    const objLogin = {
        method: 'post',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/daily-log/create`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        },
        data: data
    }
    return objLogin;
}