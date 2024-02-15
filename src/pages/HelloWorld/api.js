export {getGreetings, helloWorld}

function getGreetings(){
    const objGreetings = {
        method: 'get',
        url: `${process.env.REACT_APP_LOCAL_APP}/helloworld/greets/`,
        headers: {
            'Content-Type': 'application/json',
        }
    }

    return objGreetings
}

function helloWorld(data){
    const objHelloWorld = {
        method: 'post',
        credetials:true,
        url: `${process.env.REACT_APP_LOCAL_APP}/helloworld/`,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            "Access-Control-Allow-Credentials": true,
        },
        data:data
    }
    return objHelloWorld;
}