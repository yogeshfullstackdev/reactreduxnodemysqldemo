const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const sql = require("./db.js");

// constructor
const User = function(User) {
	this.username = User.username;
	this.password = User.password;
	/* this.body = User.body;
	this.status = User.status;
	this.created = User.created;
	this.comments = [CommentSchema]; */
  };
  
  User.save = (newUser, result) => {
	sql.query(
		`SELECT * FROM users WHERE LOWER(username) = LOWER(${sql.escape(newUser.username)});`,
		(err, res) => {
		  	if (res.length) {
				/* return res.status(409).send({
				msg: 'This username is already in use!'
				}); */
				console.log("error: ", err);
				result(err, null);
				return;
			} 
			else 
			{
				// username is available
				bcrypt.hash(newUser.password, 10, (err, hash) => {
					if (err) {
						/* return res.status(500).send({
						msg: err
						}); */
						console.log("error: ", err);
						result(err, null);
						return;
					} else {
						// has hashed pw => add to database
						/* sql.query(
							`INSERT INTO users (id, username, password, registered) VALUES ('${uuid.v4()}', ${db.escape(
							req.body.username
						)}, ${db.escape(hash)}, now())`, */
						sql.query(
							`INSERT INTO users (uuid, username, password) VALUES ('${uuid.v4()}', ${sql.escape(
							newUser.username
						)}, ${sql.escape(hash)})`,
						(err, res) => {
						if (err) {
							console.log("error: ", err);
							result(err, null);
							return;
							/* throw err;
							return res.status(400).send({
								msg: err
							}); */
						}
						/* return res.status(201).send({
						msg: 'Registered!'
						}); */

						console.log("Registered ", { id: res.insertId });
						result(null, { id: res.insertId });

					}
					);
				}
				});
		  	}
		}
	  );
  };
  
  User.findOne = (username, password, result) => {
	console.log(password);
	sql.query(`SELECT * FROM users WHERE username = ${sql.escape(username)};`,
	(err, res) => {
		// user does not exists
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}
		if (!res.length) {
			result({ kind: "user not_found" }, null);
			return;
		}
		//console.log(res[0]['password']);
		// check password
		bcrypt.compare(
		  password,
		  res[0]['password'],
		  (bErr, bResult) => {
			// wrong password
			if (bErr) {
				result({ kind: "password not matched" }, null);
			}
			if (bResult) {
			    /* const token = jwt.sign({
				  username: res[0].username,
				  userId: res[0].id
				},
				'SECRETKEY', {
				  expiresIn: '7d'
				} */
				const token = jwt.sign({
					username: res[0].username,
					userId: res[0].id
				  },
				  process.env.JWTSECRET, {
					expiresIn: '7d'
					}
			   	);
			   /* db.query(
				 `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
			   ); */
			   console.log("found user: ", token);
			   result(null, token);
			   return;
			}
			result({ kind: "not_found" }, null);
		  }
		);
	  }
	);
  
  };
  
 
  

  /* router.post('/login', (req, res, next) => {
	db.query(
	  `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
	  (err, result) => {
		// user does not exists
		if (err) {
		  throw err;
		  return res.status(400).send({
			msg: err
		  });
		}
		if (!result.length) {
		  return res.status(401).send({
			msg: 'Username or password is incorrect!'
		  });
		}
		// check password
		bcrypt.compare(
		  req.body.password,
		  result[0]['password'],
		  (bErr, bResult) => {
			// wrong password
			if (bErr) {
			  throw bErr;
			  return res.status(401).send({
				msg: 'Username or password is incorrect!'
			  });
			}
			if (bResult) {
			  const token = jwt.sign({
				  username: result[0].username,
				  userId: result[0].id
				},
				'SECRETKEY', {
				  expiresIn: '7d'
				}
			  );
			  db.query(
				`UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
			  );
			  return res.status(200).send({
				msg: 'Logged in!',
				token,
				user: result[0]
			  });
			}
			return res.status(401).send({
			  msg: 'Username or password is incorrect!'
			});
		  }
		);
	  }
	);
  }); */
  

  
  module.exports = User;