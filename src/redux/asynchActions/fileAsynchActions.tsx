export const getFileList = () => async dispatch => {
    dispatch({type: 'GET_FILE_LIST_STARTED'});
    try {
        const res = await fetch('http://localhost:8080/api/test');
        const data = await res.json();
        dispatch({type: 'GET_FILE_LIST_SUCCESS', payload: data});
    } catch (err) {
        dispatch({type: 'GET_FILE_LIST_FAILURE', payload: err})
    }
}