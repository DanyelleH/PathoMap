async function basicFetch(url, payload) {
  const res = await fetch(url, payload)
  const body = await res.json()
  return body
}

  export async function updateUserInfo(username,context, userToken) {
    const payload = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      },
      body: JSON.stringify(context),
    };
    const body = await basicFetch(`http://localhost:8000/api/v1/accounts/${username}/`, payload)
    return body;
  }
