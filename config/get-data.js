
var config = require('./config');
var mysql = require('mysql'); 

var bcrypt = require('bcrypt');
var saltRounds = 10;

var jwt = require('jsonwebtoken');

// var connection = mysql.createConnection({  
//     host     : config.mysqlHost,
//     user     : config.mysqlUser,
//     password : config.mysqlPassword,
//     database : config.mysqlDb
//   });


const { Client } = require('pg');
const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pruchha',
  password: '12345',
  port: 5432,
});
connection.connect();

module.exports = {

	getBusinessInfo(uid, callback){

		var query;

		// if(uid){
			query = "select * from pr_business.pr_business_info where uid = '"+uid+"'";
		// }else if(business_id){
		// 	query = "select * from pr_business_info where business_id = " + business_id+"'";
		// }
		
// console.log(query)
	    connection.query(query , function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else if(res.rows.length == 1){console.log(res.rows)
	        var response = {
	        	data: res.rows[0]
	        };
	        callback(null,response);
	      }else{
	      	var response = {
	        	response: 'business not present'
	        };
	        callback(null,response);
	      }
	    });

	},


	getBusinessAdditionalInfo(business_id, callback){

	    connection.query("select * from pr_business.pr_business_additional_info where business_id = " + business_id, function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else if(res.rows[0]){
	        var response = {
	        	data: res.rows[0]
	        };
	        callback(null,response);
	      }
	    });

	},


	getBusinessStats(uid, business_id, callback){

		if(uid){
			query = "select * from pr_business.pr_business_stats where uid = " + uid;
		}else if(business_id){
			query = "select * from pr_business.pr_business_stats where business_id = " + business_id;
		}
		
	    connection.query(query, function(err,res){
	      if(err){
	        callback(err,null);
	      }else if(res.rows.length == 0){ 
	       var response = {
	        	response: 'business not present'
	        };
	        callback(null,response);
	      }
	      else{
	      	 var response = {
	        	data: res.rows[0]
	        };
	        callback(null,response);
	      }
	    });
	},
	
	getRecentNotifications(noti_receiver_id, callback) {

	    connection.query("select * from pr_business.pr_business_notifications where noti_receiver_id = " + noti_receiver_id, function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else if(res.rows[0]){
	        var response = {
	        	data: res.rows[0]
	        };
	        callback(null,response);
	      }else{
	      	var response = {
	        	response: 'user not present'
	        };
	        callback(null,response);
	      }
	    });
	},

	getVisitorsInfo(uid, business_id, callback) {

	    connection.query("select * from pr_business.pr_business_visitor_info where business_id = " + business_id, function(err,res){ 
	    	console.log(query)
	      if(err){
	        callback(err,null);
	      }else if(res.rows[0]){
	        var response = {
	        	data: res.rows
	        };
	        callback(null,response);
	      }
	    });
	},

	getClientVisitorsContactsMsg(business_id, callback) {

	    connection.query("select * from pr_business.pr_business_contact where business_id = " + business_id, function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else if(res.rows[0]){
	        var response = {
	        	data: res.rows[0]
	        };
	        callback(null,response);
	      }
	    });
	},
	

};