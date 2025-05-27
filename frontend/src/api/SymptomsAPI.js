const baseUrl = import.meta.env.VITE_BASE_URL
// const baseUrl = "127.0.0.1:8000"
async function basicFetch(url, payload) {
    const res = await fetch(url, payload)
    const body = await res.json()
    return body
  }
  

export async function analyzeSymptoms(token, context) {
    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
      body: JSON.stringify(context)
    }
    const body = await basicFetch(`https://${baseUrl}/api/v1/diagnosis/analyze-symptoms/`,payload)
    return body
  }