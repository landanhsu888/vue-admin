let member = {
  MEMBER_FIND (context: any) {
    window.fetch('http://127.0.0.1:3002/api/member', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'text/plain'
      },
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include'
    }).then((res) => {
      return res.json()
    }).then((resJson) => {
      let members = resJson.data
      context.commit('MEMBER_FIND', members)
    })
  },
  MEMBER_INSERT (context: any, members: Array<Object>) {
    let member = members.shift()
    return window.fetch('http://127.0.0.1:3002/api/member', {
      method: 'POST',
      body: JSON.stringify({
        ...member
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      return res.json()
    }).then((resJson) => {
      let members = resJson.data
      context.commit('MEMBER_INSERT', members)
    })
  }
}

export default member
