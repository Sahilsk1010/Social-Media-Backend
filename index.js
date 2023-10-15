// const express = require('express');
// const cors = require('cors');
// const mysql = require('mysql');
// const { connection } = require('mongoose');
// const userroute = require('./routes/users');

// const authroute = require('./routes/auth');
// const app = express();
// app.use(express.json());
// app.use(cors());


// app.use('/api/users',userroute)

// app.use('/api/users',authroute);





// app.listen(3000, () => {
//   console.log("Server is running at port 3000");
// });


const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const userroute = require('./routes/users');
const authroute = require('./routes/auth');
const cookieparser = require('cookie-parser');
const postsroute = require('./routes/posts')
const comment = require('./routes/comments');
const like= require('./routes/likes');
const relationship = require('./routes/relationships');
const stories = require('./routes/stories');
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.use('/api/users', userroute);
app.use('/api/users', authroute);
app.use('/api/user',postsroute)
app.use('/api/users/comments',comment);
app.use('/api/users',like)
app.use('/api/users',relationship);
app.use('/api/userstories',stories);
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
