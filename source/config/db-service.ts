import { MongoClient } from 'mongodb';
import config from './config';
import logging from './logging';

const NAME_SPACE = 'DB Service';

async function connectDB() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    logging.info(NAME_SPACE, config.mongo.url)
    const client = new MongoClient(config.mongo.url);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        logging.info(NAME_SPACE, `DB connected to ` + config.mongo.url)

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (error) {
        logging.error(NAME_SPACE, error.message, error)
    } finally {
        await client.close();
    }
}

async function listDatabases(client: any) {
    let databasesList = await client.db().admin().listDatabases();

    logging.info(NAME_SPACE, `Data Bases: `, databasesList)
    databasesList.databases.forEach((db: { name: any; }) => console.log(` - ${db.name}`));
};

//connectDB().catch(console.error);

export default { connectDB };