export {kinerja}

function kinerja(data){
    const objPredikat = {
        method: 'post',
        credentials: "include",
        url: `${process.env.REACT_APP_LOCAL_APP}/kinerja/predikat`,
        headers: {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true,
        },
        data:data
    }
    return objPredikat;
}