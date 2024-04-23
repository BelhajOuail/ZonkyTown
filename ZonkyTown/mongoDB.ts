import { MongoClient } from "mongodb";

const uri = "mongodb+srv://<denvenum>:<Alinaim+1>@projectwebontwikkeling.kwqzi3l.mongodb.net/?retryWrites=true&w=majority&appName=ProjectWebontwikkeling";
const client = new MongoClient(uri);

async function main() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        //...
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}
