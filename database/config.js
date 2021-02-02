const mongoose = require('mongoose');


const dbConnection = async () => {
   //mongodb+srv://mean_user:A9uZMRiW73KFjWcB@cluster0.skmq2.mongodb.net/hospitaldb
   try {
       await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('base de datos online')
   } catch (error) {
       console.log(error)
       throw new Error('error a la hora de iniciar la base de datos')
   }
    
    
}
module.exports = {
    dbConnection
}