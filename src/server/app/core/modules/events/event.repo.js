import logger from "#logger";
const eventRepo = (connPool) => {
    const createEvent = async (eventData) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            // Need to get the insert data ID thats why RETURNING *
            const insertQuery = 'INSERT INTO events (title, slug, location, full_description, event_date, is_featured) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [eventData.title, eventData.slug, eventData.location, eventData.description, eventData.date, eventData.is_featured];
            const result = await dbClient.query(insertQuery, values);
            if (result && result.rowCount > 0) {
                logger.info(`Create Event Resutl Set row count :${result.rowCount}`);
                return result.rows[0];
            }
            else {
                logger.info(`Create Event Resutl Set row count :${result.rowCount}`);
                throw new Error('Failed to create event');
            }
        } catch (error) {
                logger.info(`Create Event Error:${error.message}`);
                throw new Error(`Failed to create event`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    // Create Image Record in Database
    const createImageData = async (imageData) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const insertQuery = 'INSERT INTO event_images (event_id, image_url, cloudinary_public_id) VALUES ($1, $2, $3) RETURNING *';
            const values = [imageData.event_id, imageData.image_url, imageData.cloudinary_public_id];
            const result = await dbClient.query(insertQuery, values);
            if (result && result.rowCount > 0) {
                return result.rows[0];
            }
            else {
                console.log(`Result row count: ${result.rowCount}`);
                throw new Error('Failed to create image record');
            }
        } catch (error) {
            console.error('Error creating Image record for Event:', error.message);
            throw new Error(`Failed to create image record for event: ${imageData.event_id}`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    };

    // Get all events from Database
    const listEvents = async () => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const listEventQuery = "SELECT e.*,ei.image_url,ei.cloudinary_public_id from events e LEFT JOIN event_images ei ON(e.id=ei.event_id)";
            const resultSet = await dbClient.query(listEventQuery);
            logger.info(`Total Events found in Datbase:${resultSet.rowCount}`);
            if (resultSet && resultSet.rowCount > 0) {
                return resultSet.rows;
            }
            else {
                return resultSet.rows;
            }
        } catch (error) {
            console.log(`Got Error on List Events: ${error.message}`)
            throw new Error('Exception while Listing Events');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }

    // Get Event by Event Id from Database
    const listEventById = async (id) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const listEventQuery = `SELECT e.*,ei.image_url,ei.cloudinary_public_id from events e LEFT JOIN event_images ei ON(e.id=ei.event_id) where ei.event_id=$1`;
            const values = [id];
            const resultSet = await dbClient.query(listEventQuery,values);
            if (resultSet && resultSet.rowCount > 0) {
                // console.log(resultSet.rows);
                return resultSet.rows[0];
            }
            else {
                return [];
            }
        } catch (error) {
            console.log(`Got Error on List Events: ${error.message}`)
            throw new Error('Exception while List Event');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }

    // Delete Event by Id from Databse, the record associated with the event in image table automatically get deleted 
    const removeEventById = async (eventId) => {
        let dbClient = null;
        try {
            dbClient = await connPool.connect();
            const queryImage = `SELECT cloudinary_public_id FROM event_images WHERE event_id=$1`;
            const resultImage  =  await dbClient.query(queryImage,[eventId]);
            if(resultImage.rowCount > 0)
            {
                const eventQuery = `DELETE FROM events where id=$1 RETURNING *`;
                const resultEvent = await dbClient.query(eventQuery,[eventId]);
                logger.info(`Delete Event Result row count:${resultEvent.rowCount}`);
                return {...resultEvent.rows[0],cloudinary_public_id:resultImage.rows[0].cloudinary_public_id};
            }
            else{
                return [];
            }

        } catch (error) {
            logger.error(`Delete Event Error for id:${eventId} Error:${error.message}`);
            throw new Error(`Failed to Delete Event by Id:${eventId}`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }

    return {
        createEvent,
        createImageData,
        listEvents,
        listEventById,
        removeEventById
    };
}
export default eventRepo;