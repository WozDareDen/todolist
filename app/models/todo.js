const connection = require ('../config/connection');

function Todo() {
  this.get = function(res) {
    return new Promise(function(resolve, reject) {
      connection.acquire(function(err,con) {
        con.query('select * from list', function(err,result) {
          if(err) throw err;
          con.release();      
          resolve(result)
          console.log("Get successful");
        });
      });
    })
  };
  
  this.getByID = function(id,res) {
    connection.acquire(function(err,con) {
      con.query('select * from list where id = ?', id, function(err,result) {
        con.release();
        res.send(result);
        console.log("Get by ID successful");
      });
    });
  };
  this.create = function(newtodo,res) {
    return new Promise(function(resolve, reject) {
      connection.acquire(function(err,con) {
        con.query('insert into list(task,reg_date) values(?, now())', newtodo, function(err,result) {
          con.release();       
          if (err) {
            res.send(err);
          } else {
            resolve(result)         
          }
        });
        console.log("Post successful");
      });
    })
  };
  this.update = function(todo,id,res) {
    connection.acquire(function(err,con) {
      con.query('update list set task = ? where id = ?', [todo, id], function(err,result) {
        con.release();
        if (err) {
          res.send({status:1, message:'TODO update fail'});
        } else {
          res.send({status:0, message:'TODO update success'});
          console.log("Put successful");
        }
      });
    });
  };
  this.delete = function(id,res) {
    return new Promise(function(resolve, reject) {
      connection.acquire(function(err,con) {
        con.query('delete from list where id = ?', id, function(err,result) {
          con.release();
          if (err) {
            res.send(err);
          } else {
            resolve(result)   
            console.log("Delete successful");
          }
        });
      });
    })
  }; 
};

module.exports = new Todo();
