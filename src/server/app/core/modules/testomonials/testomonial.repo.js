import logger from "#logger";
const TestomonialRepo = (connPool) => {
    // Create a new testimonial in Database
    const createTestomonial = async (testomonialData) => {
        let dbClient = null;
        const query = "INSERT INTO testimonials (client_name, designation, department, testimonial_text, rating, is_featured, image_url, image_public_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";
        const values = [testomonialData.client_name, testomonialData.designation, testomonialData.department, testomonialData.testimonial_text, testomonialData.rating, testomonialData.is_featured, testomonialData.image_url, testomonialData.image_public_id];
        try {
            dbClient = await connPool.connect();
            const result =await dbClient.query(query, values);  
            if(result && result.rowCount>0){
                return result.rows[0];
            }
            else{
                // Need to provide Descriptive Message of No data found instead of Error
                return result.rowCount;
            }    
        } catch (error) {
            logger.error(`Create Testomonial Error:${error.message}`);
            throw new Error('Failed to create testomonial');   
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    const listTestomonial = async () => {
        let dbClient = null;
        try {
            const query = "SELECT * FROM testimonials ORDER BY created_at DESC";
            dbClient = await connPool.connect();
            const result = await dbClient.query(query);
            return result.rows;
        } catch (error) {
            logger.error(`List Testomonial Error:${error.message}`);
            throw new Error('Failed to list testomonials');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    const removeTestomonial = async (id) => {
        let dbClient = null;
        try {
            const query = "DELETE FROM testimonials WHERE id = $1 RETURNING *";
            dbClient = await connPool.connect();
            const result = await dbClient.query(query, [id]);
            logger.info(`Remove Testomonial Row Count :${result.rowCount}`);
            return result.rows[0];
        } catch (error) {
            logger.error(`Remove Testomonial Error:${error.message}`);
            throw new Error('Failed to remove testomonial');
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    }
    return {    
        createTestomonial,
        listTestomonial,
        removeTestomonial
    };
}
export default TestomonialRepo;