const API_URL = 'http://localhost:8000/api/v1'

export async function createWorker(data) {
    const response = await fetch(`${API_URL}/workers/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}
export async function createCustomer(data) {
    const response = await fetch(`${API_URL}/customers/signup`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}

export async function login(data) {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}
