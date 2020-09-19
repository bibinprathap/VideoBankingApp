export default createError = error => {
    let errorToThrow = error;

    if (error.response) {
        if (error.response.data) {
            if (error.response.data.error) {
                //this is the case when SmartHub backend returns a proper application specific error
                let tempError = error.response.data.error;
                console.log('checkpoint 1');
                errorToThrow = _createError(
                    tempError,
                    tempError.message || error.response.message || error.message,
                    tempError.details || error.detail || error.message,
                    tempError.code
                );
            } else {
                console.log('checkpoint 2');
                //this is the case when an exception is thrown in smarthub which is returned as is
                let tempError = error.response.data;
                errorToThrow = _createError(
                    tempError,
                    tempError.message || error.response.message || error.message,
                    tempError.exceptionMessage || error.message,
                    error.response.status
                );
            }
        } else {
            console.log('checkpoint 3');
            //this is the case when backend failed before calling controller (such as 404, bad request etc.)
            errorToThrow = _createError(error, error.message, error.detail, error.response.status);
        }
    } else {
        //when we fail to make a request from the client end, cases such as when requestConfig is invalid

        errorToThrow = _createError(error, error.message, error.detail, error.status);
    }
    return errorToThrow;
};

_createError = (error, message = 'Unknown error', detail, code = 0) => {
    //Todo: log the error with stack trace for debugging, and perhaps send to some remote server for analysis
    console.log('message:', message, 'detail: ', detail, 'code: ', code);
    return {
        message,
        detail,
        code,
        originalError: error,
    };
};
