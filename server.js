const global = require('./src/helpers/global')
const config = require('./src/helpers/config')
const db_connection = require('./src/helpers/db_connection')
const router = require('./router')


const app = global.express()
// app.use(global.bodyParser.urlencoded({ extended: false }));
app.use(global.bodyParser.json())
// app.use(global.bodyParser({ keepExtensions: true }))
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type,authorization,Accept,accesstoken')
    next()
}
app.use(allowCrossDomain)
app.use('/api', router);

db_connection.ConnectDB().then(db => {
    console.log(`Connected to Database ${config.db_path}`)
    app.listen(config.port, () => console.log(`Server listening on port ${config.port}`))
}).catch(err => {
    console.error.bind(console, "MongoDB connection error:")
})