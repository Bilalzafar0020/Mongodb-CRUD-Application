
import  { MongoClient } from  'mongodb'
//  way to connect to mongodb database using driver which we have setup ;
const uri = "mongodb+srv://bilalzafar156673:Bilalzafar123@cluster1.zuopu3z.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
 export  const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    console.log('Connected to atlas ');
    // database and collection code goes here
    // find code goes here
    // iterate code goes here
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();

    // process.exit(0);  // so that  the  application come out of database 1 and  0 can also use 
  }
}
run().catch(console.dir);

