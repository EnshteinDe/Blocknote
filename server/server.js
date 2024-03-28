const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const blocknoteRouter = require('./routes/blocknoteRouter');
const userRouter = require('./routes/userRouter');
const noteRouter = require('./routes/noteRouter')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    name: 'sid',
    secret: process.env.SESSION_SECRET ?? 'test',
    resave: true,
    store: new FileStore(),
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 12,
      httpOnly: true,
    },
  })
);

app.use('/api/blocknotes', blocknoteRouter);
app.use('/api/user', userRouter);
app.use('/api/notes', noteRouter);

app.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
