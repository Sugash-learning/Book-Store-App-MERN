import express from 'express';

const router = express.Router();

router.post('/',async(request,response) =>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear 

        )   {
            return response.status(400).send({
                message:'Sent all required fields:title, author, publishyear',
            });
        }
        const newBook ={
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }   catch(error){
            console.log(message.error);
    }
});
router.get('/', async(request,response)=>{
    try{
     
      const books = await Book.find({});
      return response.status(200).json({
        count: books.length,
        data: books
      });
    } catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message})
    }
});
// Get Book from database
router.get('/:id', async(request,response)=>{
    try{
       
      const {id} = request.params;
      const objectId = new mongoose.Types.ObjectId(id);
        
      const book = await Book.findById({objectId});
      return response.status(200).json(book);
    } catch(error){
      console.log(error.message);
      response.status(500).send({message: error.message})
    }
});
router.put('/:id', async (request,response) =>{
    try {
      if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear 
       ) {
        return response.status(400).send({
            message:'Sent all required fields:title, author, publishyear',
        });
      }

      const {id} = request.params;
      const result = await Book.findByIdAndUpdate(id, request.body);

      if(!result) {
        return response.status(404).json({message:'Book not Found'})
      } 
      return response.status(404).json({message:'Book update sucessfully'})
    
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message});
    }
});
router.delete('/:id', async(request,response) =>{
    try{
      const {id} = request.params;
      const result = await Book.findByIdAndDelete(id);

      if(!result) {
        return response.status(404).json({message: 'Book not Found'})
      }
      return response.status(200).json({message: 'Book deleted successfully'})
    } catch(error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
    }
});

export default router;