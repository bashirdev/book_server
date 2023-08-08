import BookModel from "./model.js";


export const CreateBook=async(req,res, next)=>{
    console.log(req.body);
    let body =req.body;
 console.log(body);
 try {
    const books=await BookModel.create(body)
    res.status(200).json({status:'success', data:books})
     books.save() 
 } catch (error) {
    console.log(error);
  next()
 }

}



  export const QueryGetAllBook=async(req, res)=>{
  
    try{
      let pageNo = Number(req.query.pageNo);
      let perPage = Number(req.query.perPage);
      let searchValue = req.query.searchKeyword;
      let skipRow = (pageNo - 1) * perPage;
  
      let data;
  
      if (searchValue!=="0") {
  
          let SearchRgx = {"$regex": searchValue, "$options": "i"}
          let SearchQuery = {$or: [{title: SearchRgx},{genre:SearchRgx},{author:SearchRgx}]}
  
          data = await BookModel.aggregate([{
              $facet:{total:[{ $match: SearchQuery}],
                  // Rows:[{$match: SearchQuery}],
                  Rows:[{$match: SearchQuery},{$skip: skipRow}, {$limit: perPage}],
          }
          }])
  
  
      }
      else {
  
          data = await BookModel.aggregate([{
              $facet:{
                  Total:[{$count: "count"}],
                  Rows:[{$skip: skipRow}, {$limit: perPage}],
              }
          }])
  
      }
  
      res.status(200).json({status: "success", data:data})
  
  }
  
  catch (error) {
      res.status(400).json({status: "failed",error:error})
  }
  }


  export const GetSingleBook=async(req, res)=>{
    try {
     const singleBook=await BookModel.findById({_id:req.params.id})
     res.status(200).json({status:'Success', data:singleBook})

    } catch (error) {
      console.log(error);
      
    }
  
  } 
 
  

  
export const BookUpdate=async(req,res)=>{
 console.log(req.params.id);
 console.log(req.body);
     try {
      const updateBook=await BookModel.findOneAndUpdate({_id:req.params.id}, {$set:req.body}, {new:true, useFindAndModify:true})
      res.status(200).json({status:'fail', data:updateBook}) 
     await updateBook.save();
     } catch (error) {
     console.log(error);
     }
    
  }


  export const DeleteSingleBook=async(req, res, next)=>{
    try {
     const product=await BookModel.findByIdAndDelete({_id:req.params.id})
     res.status(200).json({status:'success', data :product})

    } catch (error) {
      console.log(error);
      next(error)
    }
  
  } 