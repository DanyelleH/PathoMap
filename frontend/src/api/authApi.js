const baseUrl = import.meta.env.VITE_BASE_URL
// const baseUrl = "127.0.0.1:8000"
async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  
  
  export async function signup(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${baseUrl}/api/v1/accounts/signup/`,payload)
    return body
  }
  

  export async function login(context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`http://${baseUrl}/api/v1/accounts/get-token/`, payload)
    return body.token
  }

  
  