const API_URL = 'http://localhost:8080/api';

// user login API to validate the credential
export const userLoginService = (email: String, password: String) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_name: 'NoteSum Password Grant Client', password: password, email: email })
    };
    fetch('http://localhost:8080/api/login', requestOptions)
        .then(async response => {
            return await response.json();
        });
}
