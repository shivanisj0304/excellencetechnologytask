var express = require('express');
var router = express.Router();
var pool=require("./pool");


/////////////* Add new candidate *////////////////////////////////////

router.get('/addnewcandidate', function(req, res, next) {
    pool.query("insert into candidate(candidatename,email)values(?,?)",
    [
      req.query.candidatename,
      req.query.email,
      ],
    function(error,result){
       if(error)
            { console.log(error)
                res.render('candidate',{msg:'servererror:fail to submit record'});
            }
       else
             { console.log(result)
                res.render('candidate',{msg:'record submitted....'});
            }
    })
  });

  /////////////////////////////////////////////////////////////////////////


  /////////////////////// Add Candidate Score //////////////////////////////

  router.get('/addcandidatescore', function(req, res, next) {
      var max=  parseInt(req.query.round1)+ parseInt(req.query.round2)+ parseInt(req.query.round3);
      var avg=parseInt(max/3);
    pool.query("insert into candidatescore(email,round1,round2,round3,max,avg)values(?,?,?,?,?,?)",
      [
        req.query.email,
        req.query.round1,
        req.query.round2,
        req.query.round3,
        max,
        avg,
      
      ],
    function(error,result){
      if(error)
             { console.log(error)
                  res.render('candidatescore',{msg:'servererror:fail to submit record'});
              }
      else 
            { console.log(result)
                  res.render('candidatescore',{msg:'record submitted....'});
             }
    })
  });

  ////////////////////////////////////////////////////////////////////


  /////////////////////////Fetch Gmail /////////////////////////////

  router.get('/fetchallgmail', function(req, res, next) {
    pool.query("select * from candidate" , function(error,result) {
      if(error)
               {//console.log(error)
                 res.status(500).json([])
               }
      else
          {
            res.status(200).json(result)
          }
    })
    });

////////////////////////////////////////////////////////////////////



///////////////////////////////Display All Candidate///////////////////////////

  router.get('/displaycandidate', function(req, res, next) {
      pool.query("select CS.*,(select C.email from candidate C where C.email=CS.email) as cemail,(select C.candidatename from candidate C where C.email=CS.email) as cname from candidatescore CS",function(error,result){
        if(error)
        {
            console.log(error)
            res.render('displayallcandidate',{data:[]});
        }
        else{
            console.log(result);
            res.render('displayallcandidate',{data:result});
        }
      });
   
  });

 ///////////////////////////////////////////////////////////////////////////// 


//////////////////////////Display Maximum Mark Candidate/////////////////////

  router.get('/displaymaxcandidate', function(req, res, next) {
    pool.query("SELECT candidatescore.*,(select C.email from candidate C where C.email=candidatescore.email) as cemail,(select C.candidatename from candidate C where C.email=candidatescore.email) as cname FROM `candidatescore` WHERE max=(select max(max) from candidatescore)",function(error,result){
      if(error)
      {
          console.log(error)
          res.render('displayallcandidate',{data:[]});
      }
      else{
          console.log(result);
          res.render('displayallcandidate',{data:result});
      }
    });
 
});

///////////////////////////////////////////////////////////////////////////

////////////////////Candidate Interface/////////////////////

   router.get('/candidateinterface', function(req, res, next) {
      res.render('candidate',{msg:''});
 });

 ///////////////////////////////////////////////////////////

 ///////////////////CandidateScore Interface/////////////////////

    router.get('/candidatescoreinterface', function(req, res, next) {
        res.render('candidatescore',{msg:''});
     });

/////////////////////////////////////////////////////////////////

module.exports = router;

