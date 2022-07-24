

const returnSuccess = (res,payload = null) => {
    const resMess = {
        DDD : "DDDDDD"
    }
    if(payload) resMess.resultData = payload
    return res.status(200).send(resMess);
}

export {
    returnSuccess
}