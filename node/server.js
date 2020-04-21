var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

let sessions = {}

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('路径为：' + pathWithQuery)

  if(path === '/style.css'){
    var string = fs.readFileSync('./style.css','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.setHeader('Cache-Control', 'max-age=30')
    response.write(string)
    response.end()
  }
  else if(path === '/'){
    var string = fs.readFileSync('./index.html','utf8')
    let cookies = ''
    if (request.headers.cookie) {
      cookies =  request.headers.cookie.split('; ')
    }
    let hash = {}
    for(let i =0;i<cookies.length; i++){
      let parts = cookies[i].split('=')
      let key = parts[0]
      let value = parts[1]
      hash[key] = value 
    }
    console.log(hash)

    let mysession = sessions[hash.sessionId]
    let email
    if (mysession) {
      email = mysession.sign_in_email
    }
    let users = fs.readFileSync('./users', 'utf8')
    users = JSON.parse(users)
    let foundUser
    for(let i=0; i< users.length; i++){
      if(users[i].email === email){
        foundUser = users[i]
        break
      }
    }
    console.log(foundUser)

    if(foundUser){
      string = string.replace('***username***', foundUser.email)
    }else{
      string = string.replace('***username***', '不知道')
    }
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }
  else if(path === '/sign-up' && method === 'GET'){
    var string = fs.readFileSync('./sign-up.html','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }
  else if(path === '/sign-up' && method === 'POST'){
    readbody(request).then((body)=>{
      let hash = {}
      let strings = body.split('&')
      strings.forEach((string) => {
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let {email,password,password_confirmation} = hash
      if(email.indexOf('@') === -1){
        response.statusCode = 400
        response.setHeader('Content-Type', 'application/json;charset=utf-8')
        response.write(`{
          "errors": {
            "email": "invalid"
          }
        }`)
      }else if(password !== password_confirmation){
        response.statusCode = 400
        response.write('password not match')
      }else{
        var users = fs.readFileSync('./users','utf8')
        try{
          users = JSON.parse(users) 
        }catch(exception){
          users = []
        }
        let flag = false
        for(let i=0; i<users.length; i++){
          let user = users[i]
          if(user.email === email){
            flag = true
            break;
          }
        }
        if(flag){
          response.statusCode = 400
          response.write('email in use')
          }
          else{
          users.push({email:email,password:password})
          var usersString = JSON.stringify(users)
          fs.writeFileSync('./users', usersString)
          response.statusCode = 200
          }
        }
      response.end()
    })
  }
  else if(path === '/sign-in' && method === 'GET'){
    var string = fs.readFileSync('./sign-in.html','utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
  }
  else if(path === '/sign-in' && method === 'POST'){
    readbody(request).then((body)=>{
      let hash = {}
      let strings = body.split('&')
      strings.forEach((string) => {
        let parts = string.split('=')
        let key = parts[0]
        let value = parts[1]
        hash[key] = decodeURIComponent(value)
      })
      let {email,password} = hash
      var users = fs.readFileSync('./users','utf8')
      try{
        users = JSON.parse(users) 
      }catch(exception){
        users = []
      }
      let found
      for(let i=0;i<users.length; i++){
        if(users[i].email === email && users[i].password === password){
         found = true
          break
        }
      }
      if(found){
        let sessionId = Math.random() * 100000
        sessions[sessionId] = {sign_in_email:email}
        response.setHeader('Set-Cookie', `sessionId = ${sessionId}`)
        response.statusCode = 200
      }else{
        response.statusCode = 401
      }
      response.end()
    })
  }
  else if(path === '/xxx'){
    response.statusCode = 200
    response.setHeader('Content-Type','text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', 'http://xxx.com')
    response.write(`
    {
      "note":{
        "to": "小明",
        "from": "小红",
        "heading": "问候",
        "content": "hello"
      }
    }
    `)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})
function readbody(request){
  return new Promise((resolve,reject)=>{
    let body = []
    request.on('data', (chunk) => {
      body.push(chunk)
    }).on('end', () => {
      body = Buffer.concat(body).toString()
      resolve(body)
    })
  })
}
server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)