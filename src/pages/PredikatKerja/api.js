export {kinerja}

function kinerja(data){
    const objPredikat = {
        method: 'post',
        url: `${process.env.REACT_APP_LOCAL_APP}/kinerja/predikat`,
        headers: {
            'Content-Type': 'application/json',
        },
        data:data
    }
    return objPredikat;
}