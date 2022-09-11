const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config()
const app = express()

app.set('port', process.env.PORT || 3000); // 속성 추가  전역변수
app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COKKIE_SECRET));
console.log(process.env.COOKIE_SECRET);

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    },
    name: 'session-cookie'
}))

app.use((req, res, next) => {
    console.log('모든 요청에 실행하고 싶어요')
    next()
}, (req, res, next) => {
    try {
     //  console.log(qasdfafsd)
    } catch (error) {
        // 에러처리 미들웨어로 감
        next(error);
    }
});
// /:와일드 카드
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
});

app.post('/', (req, res) => {
    res.send('hello express')
});

app.get('/about', (req, res) => {
   res.send('hello express')
});

app.use((req, res, next) => {
    res.send('404')
});

// error middleware
app.use((err, req, res, next) => {
    console.error(err)
    res.status(200).send('에러났음')
});

app.listen(app.get('port'), () => {
    console.log('익스프레스 서버 실행!')
});
