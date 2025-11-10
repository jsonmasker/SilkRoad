using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class ParticipantInfoRepository : GenericRepository<ParticipantInfoDTO>, IParticipantInfoRepository
    {
        public ParticipantInfoRepository(ApplicationContext context) : base(context)
        {
        }

    }
}
