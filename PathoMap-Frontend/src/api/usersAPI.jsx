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



  export async function getUserInfo(username,userToken) {
    const payload = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${userToken}`
      } };
    const body = await basicFetch(`http://127.0.0.1:8000/api/v1/accounts/${username}/`, payload)
    return body;
  }


  export async function saveDiseaseInfo(username, userToken, context) {
    // console.log(context)
    const payload = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`,
        },
        body: JSON.stringify(context)
    } 
    const response = await basicFetch(`http://127.0.0.1:8000/api/v1/accounts/${username}/saved_readings`, payload);
    return response
  }


  export async function getSavedDiseases(username, userToken) {
    const payload = {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userToken}`,}
        }
        const body= await basicFetch(`http://127.0.0.1:8000/api/v1/accounts/${username}/saved_readings`, payload);
    return body;
  }


  export async function removeSavedDiseases(username, userToken, disease_name) {
    const payload = {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${userToken}`,
        },
        body: JSON.stringify({
          current_readings: disease_name,
        }),
        }
        const body= await basicFetch(`http://127.0.0.1:8000/api/v1/accounts/${username}/saved_readings`, payload);
    return body;
  }

  export async function saveDiagnosisInfo(username, userToken, context) {
    // console.log(context)
    const payload = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`,
        },
        body: JSON.stringify(context)
    } 
    const response = await basicFetch(`http://127.0.0.1:8000/api/v1/accounts/${username}/saved_symptoms`, payload);
    return response
  }