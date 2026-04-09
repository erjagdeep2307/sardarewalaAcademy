import logger from "#logger";
const AnalyticsRepo = (connectionPool) => {
    const getDashboardData = async () => {
        // Implementation for fetching dashboard data
        let dbClient = null;
        try {
            dbClient = await connectionPool.connect();
            console.log
            const selectQuery =`
                    WITH user_counts AS (
                        SELECT COUNT(id) AS count 
                        FROM contacts 
                        WHERE status = $1
                    ),
                    pending_enquiries AS ( 
                        SELECT COUNT(id) AS count 
                        FROM contacts 
                        WHERE status = $2
                    ),
                    top_program AS ( 
                        SELECT program 
                        FROM contacts 
                        GROUP BY program 
                        ORDER BY COUNT(*) DESC 
                        LIMIT 1
                    )
                    SELECT 
                        (SELECT count FROM user_counts) AS total_users, 
                        (SELECT count FROM pending_enquiries) AS pending_enquiries, 
                        (SELECT program FROM top_program) AS top_program
                    `;

            const values = ['Approved', 'Pending'];
            const queryResult = await dbClient.query(selectQuery, values);
            if (queryResult.rowCount === 0) {
                return null;
            }
            return queryResult.rows[0];

        } catch (error) {
            logger.error(error, `Error while fetching dashboard data`);
            throw new Error(`Failed to Fetch Dashboard Data`);
        }
        finally {
            if (dbClient) {
                dbClient.release();
            }
        }
    };
    return {
        getDashboardData,
    };
};

export default AnalyticsRepo;