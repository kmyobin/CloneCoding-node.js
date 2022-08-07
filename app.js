var express = require('express') // express 관련 파일 가져옴, 반환값이 함수 형태
var app = express() // express는 함수
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
	host : 'localhost',
	port : 3000,
	user : 'root',
	password : 'star1539@!',
	database : 'jsman',

})

connection.connect();

app.listen(3000, function() {
	console.log("start! express server on port 3000");
});


app.use(express.static('public'))// public 디렉토리 내부에 있는 파일들을 static으로 알고 있을게
app.use(bodyParser.json()) // json 형태로 오는 데이터 처리
app.use(bodyParser.urlencoded({extended:true})) // client, server 주고받을 땐 encoding해서 보내는데 그렇게 온 데이터를 처리
app.set('view engine', 'ejs') // 나 view engine으로 ejs 쓸거다 

// url routing
app.get('/', function(req,res){ // 슬래쉬(/)치면 이 파일이 나타나게!
	res.sendFile(__dirname + "/public/main.html")
}) // get함수로 callback 함수를 만듦



app.get('/main', function(req, res){ // '~~/main'을 치면 이 파일이 나타나게!
	console.log('test')
	res.sendFile(__dirname + "/public/main.html")
})


app.post('/email_post', function(req, res) {
	// get : req.param('email')
	console.log(req.body.email)
	//res.send("<h1> welcome " + req.body.email + " ! </h1>" )
	res.render('email.ejs', {'email' : req.body.email}) // email.ejs에다가 email 섞여서 email.ejs에서 넣어줘
})
// 데이터랑 html 결합된 상태로 client에 내려줌


app.post('/ajax_send_email', function(req, res) {
	console.log(req.body.email)
	// check validation about input value => select db
	var responseData = {'result' : 'ok', 'email' : req.body.email}
	res.json(responseData)
});