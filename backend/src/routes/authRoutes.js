const express = require('express');

const router =
  express.Router();

  const authMiddleware =
require(
'../middleware/authMiddleware'
);

const bcrypt =
  require('bcrypt');

const jwt =
 require('jsonwebtoken');

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

router.post(

'/login',

async(req,res)=>{

try{

const{
email,
password
}=req.body;

if(
!email||
!password
){

return res
.status(400)
.json({

message:
'Email and password required'

});

}

const user=
await pool.query(

`
SELECT *
FROM users
WHERE email=$1
`,

[email]

);

if(
!user.rows.length
){

return res
.status(401)
.json({

message:
'Invalid credentials'

});

}

const foundUser=
user.rows[0];

const validPassword=
await bcrypt.compare(

password,

foundUser.password_hash

);

if(
!validPassword
){

return res
.status(401)
.json({

message:
'Invalid credentials'

});

}

const token=
jwt.sign(

{
id:
foundUser.id,

email:
foundUser.email

},

process.env.JWT_SECRET,

{
expiresIn:'7d'
}

);

res.json({

message:
'Login successful',

token,

user:{

id:
foundUser.id,

username:
foundUser.username,

email:
foundUser.email

}

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
router.get(

'/profile',

authMiddleware,

async(req,res)=>{

try{

const user=
await pool.query(

`
SELECT

id,
username,
email,
created_at

FROM users

WHERE id=$1
`,

[
req.user.id
]

);

res.json({

user:
user.rows[0]

});

}

catch(error){

console.error(
error
);

res
.status(500)
.json({

message:
'Server error'

});

}

}

);

router.put(

'/profile',

authMiddleware,

async(req,res)=>{

try{

const{
username,
email
}=req.body;

const updatedUser=
await pool.query(

`
UPDATE users

SET

username=$1,
email=$2

WHERE id=$3

RETURNING

id,
username,
email,
created_at
`,

[
username,
email,
req.user.id
]

);

res.json({

message:
'Profile updated successfully',

user:
updatedUser.rows[0]

});

}

catch(error){

console.error(
error
);

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