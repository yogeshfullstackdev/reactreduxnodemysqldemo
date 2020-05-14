const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User')

// Find a single User with a username
exports.login = (req, res) => {
    console.log(req);

    User.findOne(req.body.username, req.body.password, (err, result) => {

        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            return;
        }
        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, username: req.body.username}
            });
        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
        }

    });
};


// Find a single User with a username
exports.register = (req, res) => {
    console.log(req);
    
    // Create a News
	const newUser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    User.save(newUser, (err, result) => {

        if(err){  
            console.log(err);
            res.status(500).json({
                success: 0,
                error: err
            })
            return;
        }
        if(result){
            res.status(200).json({
                success: 1,
                data: {tokenID: result, username: req.body.username}
            });
        }else{
            res.status(401).json({
                success: 0,
                data: result
            });
        }

    });
};

/* module.exports = {

	login: function(username, password, callback){
        console.log(username);
		User.findOne({ username: username }, function(err, user) {
			if(err){
				callback(err, null);
				return
			}

			if(!user){
				//User not found
				callback(err, null);
			}else{
				
	        	user.comparePassword(password, function(err, isMatch) {
					
					if(err){
						callback(err, null);
						return
					}

					if(isMatch){
						var authToken = jwt.sign({ username: user.username, id: user.id}, process.env.JWTSECRET);
						callback(null, authToken);
					}else{
						callback(err, null);
					}
			    });
	        };

		});
	},
	register: function(username, password, callback){
		
		var newUser = new User({username,password});

		newUser.save(function(err, user) {
		    if(err){
				callback(err, null);
				return;
			}		      

			var authToken = jwt.sign({ username: user.username, id: user.id}, process.env.JWTSECRET);
			callback(null, authToken);
		});
	}
} */