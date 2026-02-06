import logger from '#logger';
const ContactRepo = (connPool) =>{
    const saveContact = async (contactData) => {
        // Logic to save contactData to database
        let dbClient;
        try {
            dbClient = await connPool.connect();
            const insertQuery = 'INSERT INTO contacts (first_name, last_name, email, phone, program,message) VALUES ($1, $2, $3, $4, $5,$6) RETURNING *';
            const values = [contactData.firstName, contactData.lastName, contactData.email, contactData.phone, contactData.program, contactData.message];
            const result = await dbClient.query(insertQuery, values);
            logger.info(`Result of contact save Row Count: ${result.rowCount}`);
            return result.rowCount;
        } catch (error) {
            logger.error('Error saving contact:', error);
            throw new Error('Failed to Save contact Data');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }   
        }
    };

    const listContacts = async () => {
        // Logic to list contacts from database
        let dbClient;
        try {
            dbClient = await connPool.connect();
            const selectQuery = 'SELECT * FROM contacts where status=$1';
            const values = ["Pending"];
            const result = await dbClient.query(selectQuery,values);
            logger.info(`Fetched ${result.rowCount} contacts`);
            return result.rows;
        }
        catch (error) {
            logger.error('Error fetching contacts:', error);
            throw new Error('Failed to Fetch Contacts');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }   
        }
    };

    const updateContact = async (id,reqData) =>{
        let dbClient;
        try {
            dbClient = await connPool.connect();
            const updateQuery = "Update contacts SET status=$1 WHERE id=$2 RETURNING id, status";
            const values = [reqData.status,id];
            const queryResult = await dbClient.query(updateQuery,values);
            if(queryResult.rowCount===0)
            {
                return null;
            }
            return queryResult.rows[0];        
        } catch (error) {
            console.error(`Failed to Update Contact. Error: ${error.message}`);
            throw new Error('Failed to Update Contact');
        }
        finally{
            if(dbClient)
            {
                dbClient.release();
            }
        }
    } 
    return {
        saveContact,
        listContacts,
        updateContact
    };
}
export default ContactRepo;
