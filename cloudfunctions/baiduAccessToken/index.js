const rq = require('request-promise')
// 
/**
 * 获取百度ai AccessToken
 */
exports.main = async (event, context) => {
  let clientId = 'D5A31tokLaqNqWuW8HyhZ6qx',
    grantType = 'client_credentials',
    clientSecret = 'q1c8tz6uNYRUf5HEL2YqLrBznbzIVSpI',
    url = `https://aip.baidubce.com/oauth/2.0/token`

  return new Promise(async (resolve, reject) => {
    try {
      let data = await rq({
        method: 'POST',
        url,
        form: {
          "grant_type": grantType,
          "client_secret": clientSecret,
          "client_id": clientId
        },
        json: true
      })
      resolve({
        code: 0,
        data,
        info: '操作成功！'
      })
    } catch (error) {
      console.log(error)
      if (!error.code) reject(error)
      resolve(error)
    }
  })
}