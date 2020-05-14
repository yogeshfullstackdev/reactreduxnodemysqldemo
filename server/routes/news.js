const express = require('express')
const router = express.Router()
const newsController = require('../controllers/newsController')
const authCheckMiddleware = require('../middleware/authCheck');

// Create a new News
router.post("/", newsController.create);

// Retrieve all News
router.get("/", newsController.findAll);

// Retrieve a single News with customerId
router.get("/:newsId", newsController.findOne);

// Update a News with customerId
router.put("/:newsId", newsController.update);

// Delete a News with customerId
router.delete("/:newsId", newsController.delete);

// Create a new News
router.delete("/customers", newsController.deleteAll);

// Add Comment on News
router.post('/:id/comment', authCheckMiddleware, newsController.createComment); 

/* router.post('/:id/comment', function(req, res, next) {
	const id = req.params.id;

	newsController.createComment(id, req.userData.username, req.body.body, function(err, result){
		if(err){  
			console.log(err);
			res.json({
				success: 0,
				error: err
			})
			return;
		}

		console.log('creating comment');

		res.json({
			success: 1,
			data: result
		});
	});

});


router.post('/', function(req, res, next) {
	newsController.create(req.body, function(err, result){
		if(err){  
			console.log(err);
			res.json({
				success: 0,
				error: err
			})
			return;
		}

		console.log('created');

		res.json({
			success: 1,
			data: result
		});
	});

});


router.get('/', function(req, res, next) {

	newsController.find(req.query, function(err, results){
		if(err){
			console.log(err);
			res.json({
				success: 0,
				error: err
			});
			return;
		}
		res.json({
			success: 1,
			data: results
		});
	});
});


router.get('/:id', function(req, res, next){
	var id = req.params.id;

	newsController.findById(id, function(err, result){
	
		if(err){
			console.log(err);
			res.status(500).json({
				success: 0,
				data: result
			});
			return;
		}

		res.status(200).json({
			success: 1,
			data: result
		});
	});
}); */

module.exports = router

