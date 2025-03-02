export async function getDiseases(token) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      }  }
    const body = await basicFetch("http://localhost:8000/api/v1/diseases/", payload)
    return body.result
  }