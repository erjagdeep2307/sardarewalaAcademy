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
            throw error;
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
            const selectQuery = 'SELECT * FROM contacts';
            const result = await dbClient.query(selectQuery);
            logger.info(`Fetched ${result.rowCount} contacts`);
            return result.rows;
        }
        catch (error) {
            logger.error('Error fetching contacts:', error);
            throw error;
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }   
        }
    };
    return {
        saveContact,
        listContacts
    };
}
export default ContactRepo;
