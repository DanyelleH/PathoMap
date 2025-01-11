window.onload = () => {
    console.log("loaded")
  }

  const basicFetch = async (url, context) => {
    const response = await fetch(url, context)
    const body = await response.json()
    return body
  }
  
  const getCredentials = (e) => {
    const uname = e.target.uname.value
    const pword = e.target.password.value
    return [uname, pword]
  }
  
  
  const createProteinHtml = (protObj, h3) => {
    const name = document.createElement("h3")
    name.innerText = protObj.name
  
    // const functions = document.createElement("h4")
    // functions.innerText = protObj.function
  
    for (let elem of [name]) {
      h3.appendChild(elem)
    }
  }
  
  const writeProteinApiResults = async (body) => {
    const h3 = document.querySelector("#getinfo")
    if(body.result) {
      createProteinHtml(body.result, h3)
    } else {
      h3.innerHTML = "You must log in first"
    }
  }
  
  const handleAuth = async (e) => {
    e.preventDefault()
    const [uname, pword] = getCredentials(e)
    const checkbox = document.querySelector("#signup")
    if(checkbox.checked) {
      signUp(uname, pword)
    } else {
      const token = await getToken(uname, pword)
      localStorage.setItem("token", token)
    }
  }
  
  const signUp = (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json" ,
      },
      body: JSON.stringify(data)
    }
    basicFetch("http://127.0.0.1:8000/accounts/signup", context)
  }
  
  const getToken = async (uname, pword) => {
    const data = {username: uname, password: pword}
    const context = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    }
    const body = await basicFetch("http://127.0.0.1:8000/accounts/get-token", context)
    return body["token"]
  }
  
  const fetchResults = async () => {
    const token = localStorage.getItem("token")
    const context =   {
      method: "GET",
      headers: {
        "Content-Type": "application/json" ,
        "Authorization": `Token ${token}`
      }
    }
    return basicFetch("http://127.0.0.1:8000/api/v1/protein", context)
  }
  
  
  window.onload = () => {
    const form = document.querySelector("#form")
    const getInfo = document.querySelector("#getinfo")
    const logout = document.querySelector("#logout-btn")
  
    form.onsubmit = (e) => handleAuth(e)
    getInfo.onclick = async () => {
      const body = await fetchResults()
      writeProteinApiResults(body)
    }
    logout.onclick = () => localStorage.removeItem("token")
  }