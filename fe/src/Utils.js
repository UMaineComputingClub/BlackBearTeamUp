class HTTPError extends Error {
    constructor(status, message) {
        super()
        this.status = status
        this.message = message
    }
}

export async function get(url) {
    const response = await fetch(`${url}`, {
        mode: 'cors'
    })
    const body = await response.json()
    if (response.status !== 200)
        throw new HTTPError(response.status, body.message)
    return body
}

export async function post(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    })
    const body = await response.json()
    if (response.status !== 200)
        throw new HTTPError(response.status, body.message)
    return body
}

export async function del(url) {
    const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors'
    })
    const body = await response.json()
    if (response.status !== 200)
        throw new HTTPError(response.status, body.message)
    return body
}