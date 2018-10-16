import AxiosHelper from '@/helpers/Axios/index'

import URL from '@/configs/url/index'

let authentication = {
  AUTHETICATION_POST_SIGNIN (context: any, { username, password }) {
    let url = URL.BASE + '/authentication/signin'
    let user = {
      username: username,
      password: password
    }
    AxiosHelper.post(url, user, false).then((resJson) => {
      resJson = resJson as Json
      let members = resJson.data
      context.commit('MEMBER_FIND', members)
    })
  }
}

export default authentication
