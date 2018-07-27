
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

	sendBusinessInfo(data, callback){

		const query = {
		  text: "INSERT INTO pr_business.pr_business_info (uid, pr_business_title, pr_business_subtitle, pr_business_about, pr_business_city, pr_business_address, pr_business_external_url, pr_business_social_links, pr_business_logo_path, pr_business_template_no, pr_business_template_theme, pr_business_published_status, pr_business_date_published, pr_business_date_modified) VALUES($1,$2, $3,$4, $5,$6, $7,$8, $9,$10, $11,$12, $13, $14) RETURNING *",
		  values: data
		}

        connection.query(query, function(error,res){console.log(res.rows)
            if(error){ 
                callback(error,null);
            }else{
            	var uid = data[0];

            	query1 = "SELECT business_id FROM pr_business.pr_business_info WHERE uid = '"+uid+"'";

	            	connection.query(query1,function(error,res){
			            if(error){
			            	console.log(error ,null);
			            }else{

			            	var business_id = res.rows[0]['business_id'];

			            	query2 = "INSERT INTO pr_business.pr_business_stats (uid, business_id) VALUES ('"+uid+"','"+business_id+"')";
								connection.query(query2,function(error,res){
						            if(error){
						            	console.log(error);
						            }else{
										console.log('success');
						            }
						        });
					        query3 = "INSERT INTO pr_business.pr_business_additional_info (business_id) VALUES ('"+business_id+"')";
								connection.query(query3,function(error,res){
						            if(error){
						            	console.log(error);
						            }else{
										console.log('success');
						            }
						        });    
			            }
			        });

                response = {  
                    response : 'successfully inserted'
                }; 

                callback(null,response);
            }
        });

	},

	updateBusinessInfo(data, callback){

		var uid = data[0]; 
        var title = data[1]; 
        var subtitle = data[2]; 
        var about = data[3]; 
        var city = data[4]; 
        var address = data[5]; 
        var external_url = data[6]; 
        var social_links = data[7]; 
        var logo_path= data[8]; 
        var template_no = data[9]; 
        var template_theme_no = data[10]; 
        var published_status = data[11];
        var date_published = data[12];
        var date_modified= data[13];

		var query;

		query = "UPDATE pr_business.pr_business_info SET pr_business_title='"+title+"',pr_business_subtitle='"+subtitle+"',pr_business_about ='"+about+"',pr_business_city='"+city+"',pr_business_address='"+address+"', pr_business_external_url ='"+external_url+"',pr_business_social_links='"+social_links+"',pr_business_logo_path='"+logo_path+"',pr_business_template_no="+template_no+",pr_business_date_published="+date_published+",pr_business_date_modified="+date_modified+"  WHERE uid="+uid+"";

        connection.query(query,function(error,res){
            if(error){
                callback(error,null);
            }else{
              response = {  
                    response : 'successfully updated'
              }; 
              callback(null,response);
            }
        });
	},


	updateBusinessAdditionalInfo(business_id, data, callback){

		var features_t = data[1];
		var features_d = data[2];
		var colorTheme = data[3];

	    connection.query("UPDATE pr_business.pr_business_additional_info SET features_title = '"+features_t+"', features_details = '"+features_d+"', pr_business_template_theme = '"+colorTheme+"' where business_id = " + business_id, function(err,rows){ 
	      if(err){
	        callback(err,null);
	      }else{
	          response = {  
                   response : 'successfully updated'
              };
	        callback(null,response);
	      }
	    });

	},


	updatePageViews(uid,ip, callback){

	    connection.query("select page_views, business_id from pr_business.pr_business_stats where uid = "+ uid, function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else{
	      	
	      	let views = parseInt(res.rows[0]['page_views']) + 1;
	      	console.log(views)
	      	var business_id = res.rows[0]['business_id'];

	      	console.log(views);
	      	
	      	query = "UPDATE pr_business.pr_business_stats SET page_views = " + views+" WHERE uid = " + uid;

	      	connection.query(query , function(err,res){ 
		      if(err){
		        callback(err,null);
		      }else{
		          // response = {  
	           //         response : 'successfully updated'
	           //    };
	            query1 = "Insert INTO pr_business.pr_business_visitor_info (visitor_ip , business_id ) VALUES ('"+ip+"',"+business_id+")";
				console.log(query)
		      	connection.query(query1 , function(err,res){ 
			      if(err){
			        callback(err,null);
			      }else{
			          response = {  
		                   response : 'successfully updated'
		              };
			        callback(null,response);
			      }
				});
		      }
			});
	
	     }
	    });
	},
	

	clientContactSubmit(data, callback){

		var uid = data[0];

		connection.query("select pr_business.business_id from pr_business_info where uid = " + uid, function(err,res){ 
	      if(err){
	        console.log(err)
	      }else{
	       var business_id = res.rows[0]['business_id'];
	       data = [business_id,data[1],data[2],data[3]];

		var query = 'INSERT INTO pr_business.pr_business_contact (business_id, sender_name, sender_email, sender_details) VALUES (?)';

		connection.query(query, [data], function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else{
	      	var response = {
	        	success: 'successfully added'
	        };
	      	callback(null,response);
	     }
	    });
	     }
	    });

		
	},

	sendRecentNotifications(noti_receiver_id, callback) {

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

	sendVisitorsInfo(business_id, callback) {
		
	    connection.query("select * from pr_business.pr_business_visitors_info where business_id = " + business_id, function(err,res){ 
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


publishBusinessPage(uid, colorTheme, callback){

	var query = "UPDATE pr_business.pr_business_info SET pr_business_published_status = "+1+", pr_business_template_theme = '"+colorTheme+"' where uid = " + uid;

	console.log(query);

	  connection.query(query , function(err,res){ 
	      if(err){
	        callback(err,null);
	      }else{
	          response = {  
                   response : 'successfully published'
              };
	        callback(null,response);
	      }
	    });
}

};