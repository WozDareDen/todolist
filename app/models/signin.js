const connection = require ('../config/connection');

function Signin(){
    this.post = (user,res)=>{
       
        connection.acquire(function(err,con){
            con.query('INSERT INTO users SET ?', user, function(err,result,fields){
                if(err){
                    res.send(err);
                }
                else{            
                    console.log('new user recorded'); 
                    res.redirect('../../todo');
                    
                }
            });
        });
    }
} 
    
module.exports = new Signin();