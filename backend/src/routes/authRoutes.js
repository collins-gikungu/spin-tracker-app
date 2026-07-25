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

const ensureAvatarColumn = async () => {
  try {
    await pool.query(`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS avatar_url TEXT
    `);
  } catch (error) {
    console.error('Could not ensure avatar column exists:', error);
  }
};

ensureAvatarColumn();

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
avatar_url,
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

router.post(

'/avatar',

authMiddleware,

async(req,res)=>{

try{

const{
avatar_url
}=req.body;

if(!avatar_url){

return res
.status(400)
.json({

message:
'Avatar image is required'

});

}

const updatedUser=
await pool.query(

`
UPDATE users

SET avatar_url=$1

WHERE id=$2

RETURNING

id,
username,
email,
avatar_url,
created_at
`,

[
avatar_url,
req.user.id
]

);

res.json({

message:
'Avatar updated successfully',

user:
updatedUser.rows[0]

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

router.put(

'/profile',

authMiddleware,

async(req,res)=>{

try{

const{
username,
email,
avatar_url
}=req.body;

const updatedUser=
await pool.query(

`
UPDATE users

SET

username=$1,
email=$2,
avatar_url=$3

WHERE id=$4

RETURNING

id,
username,
email,
avatar_url,
created_at
`,

[
username,
email,
avatar_url || null,
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

router.put(

'/password',

authMiddleware,

async(req,res)=>{

try{

const{
currentPassword,
newPassword
}=req.body;

if(
!currentPassword ||
!newPassword
){

return res
.status(400)
.json({

message:
'Current and new password are required'

});

}

const userResult=
await pool.query(

`
SELECT password_hash
FROM users
WHERE id=$1
`,

[
req.user.id
]

);

const foundUser=
userResult.rows[0];

if(!foundUser){

return res
.status(404)
.json({

message:
'User not found'

});

}

const validPassword=
await bcrypt.compare(
currentPassword,
foundUser.password_hash
);

if(!validPassword){

return res
.status(401)
.json({

message:
'Current password is incorrect'

});

}

const hashedPassword=
await bcrypt.hash(
newPassword,
10
);

await pool.query(

`
UPDATE users
SET password_hash=$1
WHERE id=$2
`,

[
hashedPassword,
req.user.id
]

);

res.json({

message:
'Password updated successfully'

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
'/forgot-password',
async(req,res)=>{

try{

const{
email
}=req.body;

if(!email){

return res
.status(400)
.json({

message:
'Email is required'

});

}

const user=
await pool.query(

`
SELECT id, email
FROM users
WHERE email=$1
`,

[email]

);

if(!user.rows.length){

return res
.status(404)
.json({

message:
'User not found'

});

}

const foundUser=
user.rows[0];

const resetToken=
jwt.sign(

{
id:
foundUser.id,

email:
foundUser.email,

type:
'password-reset'

},

process.env.JWT_SECRET,

{
expiresIn:'1h'
}

);

const resetLink=
`${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;

console.log('Password reset link:', resetLink);

res.json({

message:
'Password reset email sent. Check your email for instructions.',

resetLink

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

'/reset-password',

async(req,res)=>{

try{

const{
token,
newPassword
}=req.body;

if(
!token ||
!newPassword
){

return res
.status(400)
.json({

message:
'Token and new password are required'

});

}

if(newPassword.length < 6){

return res
.status(400)
.json({

message:
'Password must be at least 6 characters'

});

}

let decoded;

try{

decoded=
jwt.verify(

token,
process.env.JWT_SECRET

);

}

catch(error){

return res
.status(401)
.json({

message:
'Invalid or expired reset token'

});

}

if(
decoded.type !==
'password-reset'
){

return res
.status(401)
.json({

message:
'Invalid token'

});

}

const hashedPassword=
await bcrypt.hash(
newPassword,
10
);

await pool.query(

`
UPDATE users
SET password_hash=$1
WHERE id=$2
`,

[
hashedPassword,
decoded.id
]

);

res.json({

message:
'Password reset successfully'

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