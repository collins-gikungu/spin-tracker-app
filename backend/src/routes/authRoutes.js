const express = require('express');

const router =
  express.Router();

const bcrypt =
  require('bcrypt');

const pool =
  require('../config/db');

router.post(
'/register',

async (req,res) => {

try {

const {
username,
email,
password
} = req.body;

if(
!username ||
!email ||
!password
){

return res
.status(400)
.json({

message:
'All fields required'

});

}

const existingUser =
await pool.query(

`
SELECT *
FROM users
WHERE email=$1
`,

[email]

);

if(
existingUser.rows.length
){

return res
.status(400)
.json({

message:
'Email already exists'

});

}

const hashedPassword =
await bcrypt.hash(
password,
10
);

const result =
await pool.query(

`
INSERT INTO users
(
username,
email,
password_hash
)

VALUES
(
$1,
$2,
$3
)

RETURNING
id,
username,
email
`,

[
username,
email,
hashedPassword
]

);

res.status(201)
.json({

message:
'User created',

user:
result.rows[0]

});

}

catch(error){

console.error(error);

res
.status(500)
.json({

message:
'Server error'

});

}

}

);

module.exports =
router;