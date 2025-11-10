using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class ParticipantInfoConfigRepository : GenericRepository<ParticipantInfoConfigDTO>, IParticipantInfoConfigRepository
    {
        public ParticipantInfoConfigRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
