const express = require("express");

const router = express.Router();
const Idea = require("../models/Idea");



//Get all ideas
router.get("/", async (req, res) => {
  //   res.send("Hello World"); //text.html content type
  // json type content can use res.json( as well)
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Something whent wrong" });
  }
});

//Get single ideas
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({ sucess: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
});

//   Add an idea
router.post("/", async (req, res) => {
  //idea is created automatically in database here we are creating static
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });
  try {
    const saveddIdea = await idea.save();
    res.json({ success: true, data: saveddIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
});

//Update idea
router.put("/:id", async (req, res) => {

  
  try {
    const idea=await Idea.findById(req.params.id);
    if(idea.username===req.body.username){
 
    
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
            username: req.body.username,
          },
        },
        { new: true } //if id doesnt exist in idea it will create new idea
      );
      return res.json({ success: true, data: updatedIdea });
    }
    //UserName does not match
res.status(403).json({success:false,error:'You not Authorized to update'});
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
  }
});
//Delete idea
router.delete("/:id", async(req, res) => {
 try {

  const idea=await Idea.findById(req.params.id);
  // Match the username 
  if(idea.username===req.body.username){

    await Idea.findByIdAndDelete(req.params.id);
   return  res.json({success:true,data:{}});
  }
//Username do not match
res.status(403).json({success:false,error:'You not Authorized'})
 } catch (error) {
    console.log(error);
    res.status(500).json({ success: true, message: "Something went wrong" });
 } // json type content can use res.json( as well)
});

module.exports = router;
