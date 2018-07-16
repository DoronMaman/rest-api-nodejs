const express =require('express');
const router=express.Router();
const User=require('../../modal/users');
const mongoose=require('mongoose');
// router.get('/',(req,res,next)=>{
//     res.status(200).json({
//         message:'get users'
//     });
// });
router.get('/:id',(req,res,next)=>{
    const id=req.param.userId;
    User.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
  .catch(err=>{
      console.log(err);
      res.status(500).json({error:err});
  });
});
router.get('/',(req,res,next)=>{
    const id=req.param.userId;
    User.find()
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
  .catch(err=>{
      console.log(err);
      res.status(500).json({error:err});
  });
});
router.patch('/:userId',(req,res,next)=>{
    res.status(200).json({
        message:'patch rest'
    });
        
  });

  router.delete('/:userId',(req,res,next)=>{
    res.status(200).json({
        message:'delete rest'
    });
        
  });
    
  

router.post('/',(req,res,next)=>{
    const userDetails=new User({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        age:req.body.age
    });
    userDetails.save()
    .then(resualt=>{
        console.log(resualt);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:'post users',
        userDetails:userDetails

    });
});
module.exports=router;