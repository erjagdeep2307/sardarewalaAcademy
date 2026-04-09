import AppError from "#utilities/AppError";

const AnalyticsService = (analysisRepo) => {    
    const getDashboardData = async () => {
        try {
            const dashboardData = await analysisRepo.getDashboardData();
            if(dashboardData===null){
                throw new AppError(`No data for Dashboard`,404);
            }
            return dashboardData;
        } catch (error) {
            throw new AppErrorError(`Error fetching dashboard data: ${error.message}`);
        }
    };
    return {
        getDashboardData
    }
}
export default AnalyticsService;