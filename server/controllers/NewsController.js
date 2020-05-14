
const News = require('../models/News')
const Comment = require('../models/Comment')

// Create and Save a new News
exports.create = (req, res) => {

	console.log(req);
	
	// Validate request
	if (!req.body) {
	  res.status(400).send({
		message: "Content can not be empty!"
	  });
	}
	
	

	// Create a News
	const news = new News({
	  title: req.body.title,
	  teaser: req.body.teaser,
	  body: req.body.body
	});
  
	// Save News in the database
	News.create(news, (err, data) => {
	  if (err)
		res.status(500).send({
		  message:
			err.message || "Some error occurred while creating the News."
		});
	  else res.send(data);
	});
  };
  
  // Retrieve all Customers from the database.
  exports.findAll = (req, res) => {
	News.getAll((err, data) => {
	  if (err)
		res.status(500).send({
		  message:
			err.message || "Some error occurred while retrieving customers."
		});
	  else res.send(data);
	});
  };
  
  // Find a single News with a customerId
  exports.findOne = (req, res) => {
	  console.log(req.params.id);
	News.findById(req.params.newsId, (err, data) => {
	  if (err) {
		if (err.kind === "not_found") {
		  res.status(404).send({
			message: `Not found News with id ${req.params.newsId}.`
		  });
		} else {
		  res.status(500).send({
			message: "Error retrieving News with id " + req.params.newsId
		  });
		}
	  } 
	  else 
	  {
		let newscomments = [];

		getComments(req.params.newsId, function(result){
			newscomments = result;

			data['comments'] = result;
		  	res.send(data);
		   //rest of your code goes in here
		});

		  
	  }
	});
  };
  
 function getComments(newsId, callback)
 {
	Comment.findByNewsId(newsId, (cerr, cdata) => {
		if (cerr) {
			if (cerr.kind === "not_found") {
			comments = [];
			} else {
			comments = [];
			}
		} 
		else 
		{
			comments = cdata
		}  
		return callback(comments);
	});
 }

  // Update a News identified by the customerId in the request
  exports.update = (req, res) => {
	// Validate Request
	if (!req.body) {
	  res.status(400).send({
		message: "Content can not be empty!"
	  });
	}
  
	console.log(req.body);
  
	News.updateById(
	  req.params.customerId,
	  new News(req.body),
	  (err, data) => {
		if (err) {
		  if (err.kind === "not_found") {
			res.status(404).send({
			  message: `Not found News with id ${req.params.customerId}.`
			});
		  } else {
			res.status(500).send({
			  message: "Error updating News with id " + req.params.customerId
			});
		  }
		} else res.send(data);
	  }
	);
  };
  
  // Delete a News with the specified customerId in the request
  exports.delete = (req, res) => {
	News.remove(req.params.customerId, (err, data) => {
	  if (err) {
		if (err.kind === "not_found") {
		  res.status(404).send({
			message: `Not found News with id ${req.params.customerId}.`
		  });
		} else {
		  res.status(500).send({
			message: "Could not delete News with id " + req.params.customerId
		  });
		}
	  } else res.send({ message: `News was deleted successfully!` });
	});
  };
  
  // Delete all Customers from the database.
  exports.deleteAll = (req, res) => {
	News.removeAll((err, data) => {
	  if (err)
		res.status(500).send({
		  message:
			err.message || "Some error occurred while removing all customers."
		});
	  else res.send({ message: `All Customers were deleted successfully!` });
	});
  };


  // Save Comments to post.
  exports.createComment = (req, res) => {
	const id = req.params.id;
	console.log(req.userData);
	News.findById(req.params.id, function(err, result){
		if (err) {
			if (err.kind === "not_found") {
			  res.status(404).send({
				message: `Not found News with id ${req.params.newsId}.`
			  });
			} else {
			  res.status(500).send({
				message: "Error retrieving News with id " + req.params.newsId
			  });
			}
		} 
		else 
		{
		
		// Create a News
		const comments = new Comment({
			newsid: id,
			username: req.userData.username,
			body: req.body.body
	  	});
	
	  	// Save News in the database
	  	Comment.create(comments, (err, data) => {
			if (err)
		  		res.status(500).send({
					message:
			  		err.message || "Some error occurred while creating the Comments."
		  		});
			else res.send(comments);
		  });
		}
	});
  };

  
  
/* module.exports = {

	create: function(params, callback){

		News.create(params, function(err, result){
			if(err){
				callback(err, null);
				return
			}
			callback(null, result);
		});
	},
	find: function(params, callback){
		News.find(params,'_id title teaser', function(err, results){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, results);
		})
	},

	findById: function(id, callback){
		News.findById(id, function(err, results){
			if(err){
				callback(err, null);
				return;
			}
			callback(null, results);
		})
	},
	createComment: function(id, username, body, callback){
		News.findById(id, function(err, result){
			if(err){
				callback(err, null);
				return;
			}
			
			var comment = new Comment({username: username, body: body});

			result.comments.push(comment);
			
			result.save(function(err, commentResult){
				if(err){
					callback(err, null);
					return;
				}

				callback(null, commentResult);
			});
		});

	}
} */