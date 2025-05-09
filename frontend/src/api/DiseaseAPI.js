const baseUrl = import.meta.env.VITE_BASE_URL
// const baseUrl = "127.0.0.1:8000"
async function basicFetch(url, payload) {
  const res = await fetch(url, payload)
  const body = await res.json()
  return body
}


export async function getDiseases(token, disease_name) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }  }
    const body = await basicFetch(`http://${baseUrl}/api/v1/diseases/${disease_name}`, payload)
    return body
  }


export async function AllDiseases(token) {
  const payload = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`
    }  }
    const body= await basicFetch(`http://${baseUrl}/api/v1/diseases/`, payload)
    return body.result
}