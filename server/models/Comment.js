/* const mongoose = require('mongoose');  


const CommentSchema = new mongoose.Schema({  
	username: String,
	body: String,
	status: {
    	type: Number,
	    default: 1
  	},
	created: {
		type: Date,
		required: true,
		default: new Date()
	}
});

mongoose.model('Comment', CommentSchema); 

module.exports = mongoose.model('Comment');*/


const sql = require("./db.js");

// constructor
const Comment = function(Comment) {
	this.newsid = Comment.newsid;
	this.username = Comment.username;
	this.body = Comment.body;
	/* this.status = Comment.status;
	this.created = Comment.created; */
  };
  
  Comment.create = (newComment, result) => {
	sql.query("INSERT INTO comment SET ?", newComment, (err, res) => {
		//throw new Error("oops something happened");
	  if (err) {
		console.log("error: ", err);
		result(err, null);
		return;
	  }
  
	  console.log("created Comment: ", { id: res.insertId, ...newComment });
	  result(null, { id: res.insertId, ...newComment });
	});
  };
  
  Comment.findById = (newsId, result) => {
	sql.query(`SELECT * FROM Comment WHERE id = ${newsId}`, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(err, null);
		return;
	  }
	  
	  if (res.length) {
		console.log("found Comment: ", res[0]);
		result(null, res[0]);
		return;
	  }
  
	  // not found Comment with the id
	  result({ kind: "not_found" }, null);
	});
  };
  
  Comment.getAll = result => {
	sql.query("SELECT * FROM Comment", (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(null, err);
		return;
	  }
  
	  console.log("Comment: ", res);
	  result(null, res);
	});
  };
  
  Comment.updateById = (id, Comment, result) => {
	sql.query(
	  "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
	  [Comment.email, Comment.name, Comment.active, id],
	  (err, res) => {
		if (err) {
		  console.log("error: ", err);
		  result(null, err);
		  return;
		}
  
		if (res.affectedRows == 0) {
		  // not found Comment with the id
		  result({ kind: "not_found" }, null);
		  return;
		}
  
		console.log("updated Comment: ", { id: id, ...Comment });
		result(null, { id: id, ...Comment });
	  }
	);
  };
  
  Comment.remove = (id, result) => {
	sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(null, err);
		return;
	  }
  
	  if (res.affectedRows == 0) {
		// not found Comment with the id
		result({ kind: "not_found" }, null);
		return;
	  }
  
	  console.log("deleted Comment with id: ", id);
	  result(null, res);
	});
  };
  
  Comment.removeAll = result => {
	sql.query("DELETE FROM customers", (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(null, err);
		return;
	  }
  
	  console.log(`deleted ${res.affectedRows} customers`);
	  result(null, res);
	});
  };
  
  Comment.findByNewsId = (newsId, result) => {
	sql.query(`SELECT * FROM comment WHERE newsid = ${newsId}`, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(err, null);
		return;
	  }
	  
	  if (res.length) {
		console.log("found Comment: ", res);
		result(null, res);
		return;
	  }
  
	  // not found Comment with the id
	  result({ kind: "not_found" }, null);
	});
  };

  module.exports = Comment;