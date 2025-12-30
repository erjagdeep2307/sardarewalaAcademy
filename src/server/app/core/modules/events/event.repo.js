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
            else{
                console.log(`Result row count: ${result.rowCount}`);
                throw new Error('Failed to create event');
            }
        } catch (error) {
            console.error('Error creating event:', error.message);
            throw new Error(`Failed to create event`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
   
    const createImageData = async (imageData) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const insertQuery = 'INSERT INTO event_images (event_id, image_url, cloudinary_public_id) VALUES ($1, $2, $3) RETURNING *';
            const values = [imageData.event_id, imageData.image_url, imageData.cloudinary_public_id];
            const result = await dbClient.query(insertQuery, values); 
            if(result && result.rowCount > 0){
                return result.rows[0];
            }
            else{
                console.log(`Result row count: ${result.rowCount}`);
                throw new Error('Failed to create image record');
            }              
        } catch (error) {
            console.error('Error creating Image record for Event:', error.message);
            throw new Error(`Failed to create image record for event: ${imageData.event_id}`);
        }
        finally{
            if (dbClient) {
                dbClient.release();
            }
        }
    };
     return {
        createEvent,
        createImageData
    };
}
export default eventRepo;