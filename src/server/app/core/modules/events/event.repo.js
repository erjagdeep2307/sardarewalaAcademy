const eventRepo = (connPool) => {
    const createEvent = async (eventData) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            // Need to get the insert data ID thats why RETURNING *
            const insertQuery = 'INSERT INTO events (title, slug, location, full_description, event_date, is_featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [eventData.title, eventData.slug, eventData.location, eventData.description, eventData.date, eventData.is_featured];
            const result = await dbClient.query(insertQuery, values);
            if(result && result.rowCount > 0){
                return result.rows[0];
            }
            return null;
        } catch (error) {
            console.error('Error creating event:', error.message);
            throw new Error(error.message);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    return {
        createEvent
    };
}
export default eventRepo;