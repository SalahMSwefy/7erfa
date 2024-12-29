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
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return response.json()
}

export async function updateMe(data) {
    const response = await fetch(`${API_URL}/auth/updateMe`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

// orders
export async function getOrders() {
    const response = await fetch(`${API_URL}/orders`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

export async function makeOrder(data, workerId) {
    const response = await fetch(`${API_URL}/workers/${workerId}/orders`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    })
    return response.json()
}

export async function getWorkers() {
    const response = await fetch(`${API_URL}/workers`)
    return response.json()
}

export async function getCustomers() {
    const response = await fetch(`${API_URL}/customers`)
    return response.json()
}
