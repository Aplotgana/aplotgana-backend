const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require("cors")

const usersRouter = require('./routes/users')
const checkinRouter = require('./routes/checkin')
const catatanRouter = require('./routes/catatan')
const otorisasiRouter = require('./routes/otorisasi')
const inboxRouter = require('./routes/inbox')
const collabRouter = require('./routes/collaborator')
const equipRouter = require('./routes/equipment')
const locationRouter = require('./routes/location')
const webpush = require('web-push')
const bodyParser = require('body-parser')

var app = express();

const publicVapidKey = 'BILs_0_YCfDfSeP9qBL9Pc0WVChguk7_B1zWZj2-iSrGdRvX0kzd2q3oDr6tBaIrWJ7KpnA8z0FW3icZsXob6lc'
const privateVapidKey = '5qjuvUgGNThCjE4zoEJeF-jRBaJ9Gzw5doRcBGh8bH0'

webpush.setVapidDetails(
  'mailto:example@yourdomain.org',
  publicVapidKey,
  privateVapidKey
);

app.use(bodyParser.json());
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/checkin', checkinRouter);
app.use('/api/catatan', catatanRouter)
app.use('/api/otorisasi', otorisasiRouter)
app.use('/api/inbox', inboxRouter)
app.use('/api/rekanan', collabRouter)
app.use('/api/equipment', equipRouter)
app.use('/api/location', locationRouter)

app.listen(process.env.PORT || 3000, function () {
  console.log('Server running...');
});