import logger from "#logger";
const DashboardController = (analysisService)=>{
    const getDashboardData = async (req, res, next) => {
        try {
            logger.info('Fetching dashboard data');
            const dashboardData = await analysisService.getDashboardData();
            
            res.status(200).json({
                success: true,
                message: 'Dashboard data fetched successfully',
                data: dashboardData
            });
        } catch (error) {
            logger.error(error, 'Error fetching dashboard data');
            next(error);
        }
    }
    return {
        getDashboardData
    }
}
export default DashboardController;