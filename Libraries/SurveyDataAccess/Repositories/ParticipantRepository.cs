using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class ParticipantRepository : GenericRepository<ParticipantDTO>, IParticipantRepository
    {
        public ParticipantRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
        public ParticipantDTO? GetEagerParticipantById(int id)
        {
            //var data = _participant.Where(s => s.Id == id).Include(s => s.Answers).FirstOrDefault();
            //return data;
            throw new NotImplementedException();
        }

        public async Task<bool> HasAnyParticipantsAsync(int surveyFormId)
        {
            return await _dbSet.AnyAsync(s => s.SurveyFormId == surveyFormId);
        }
        //public bool CheckExistenceBySurveyFormID(int surveyFormID)
        //{
        //    var temp = _participant.Where(s => s.SurveyFormId == surveyFormID).FirstOrDefault();
        //    if (temp != null)
        //    {
        //        return true;
        //    }
        //    return false;
        //}
    }
}
