const sql = require("./db.js");
const CommentSchema = require('./Comment');  

// constructor
const News = function(News) {
	this.title = News.title;
	this.teaser = News.teaser;
	this.body = News.body;
	/* this.status = News.status;
	this.created = News.created;
	this.comments = [CommentSchema]; */
  };
  
  News.create = (newNews, result) => {
	sql.query("INSERT INTO news SET ?", newNews, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(err, null);
		return;
	  }
  
	  console.log("created News: ", { id: res.insertId, ...newNews });
	  result(null, { id: res.insertId, ...newNews });
	});
  };
  
  News.findById = (newsId, result) => {
	  console.log(newsId);
	sql.query(`SELECT * FROM news WHERE id = ${newsId}`, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(err, null);
		return;
	  }
  
	  if (res.length) {
		//res[0][];
		console.log("found News: ", res[0]);
		result(null, res[0]);
		return;
	  }
  
	  // not found News with the id
	  result({ kind: "not_found" }, null);
	});
  };
  
  News.getAll = result => {
	sql.query("SELECT * FROM news", (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(null, err);
		return;
	  }
  
	  console.log("news: ", res);
	  result(null, res);
	});
  };
  
  News.updateById = (id, News, result) => {
	sql.query(
	  "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
	  [News.email, News.name, News.active, id],
	  (err, res) => {
		if (err) {
		  console.log("error: ", err);
		  result(null, err);
		  return;
		}
  
		if (res.affectedRows == 0) {
		  // not found News with the id
		  result({ kind: "not_found" }, null);
		  return;
		}
  
		console.log("updated News: ", { id: id, ...News });
		result(null, { id: id, ...News });
	  }
	);
  };
  
  News.remove = (id, result) => {
	sql.query("DELETE FROM customers WHERE id = ?", id, (err, res) => {
	  if (err) {
		console.log("error: ", err);
		result(null, err);
		return;
	  }
  
	  if (res.affectedRows == 0) {
		// not found News with the id
		result({ kind: "not_found" }, null);
		return;
	  }
  
	  console.log("deleted News with id: ", id);
	  result(null, res);
	});
  };
  
  News.removeAll = result => {
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
  
  module.exports = News;