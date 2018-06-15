const connection = require ('../config/connection'),
      passwordHash = require('password-hash');

function Login(){
    this.post = (content,res)=>{
        obj = JSON.parse(content);
        connection.acquire(function(err,con){
            con.query('SELECT * FROM users WHERE mail=?', obj.mail, function(err,result,fields){
                if(err){
                    res.send(err);
                }
                else{
                    if(result.length >0){
                        if(passwordHash.verify(obj.pass, result[0].passW)){
                            console.log('connection Is Made !')
                            res.redirect('../../todo');
                        }
                        else{
                            res.send(err);
                        }
                    
                    }
                    else{
                        res.send(err);
                    }
                }
                });
            });
        }
    } 
    
module.exports = new Login();