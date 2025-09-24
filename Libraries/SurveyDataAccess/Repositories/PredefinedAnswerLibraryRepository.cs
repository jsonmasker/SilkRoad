using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class PredefinedAnswerLibraryRepository : GenericRepository<PredefinedAnswerLibraryDTO>, IPredefinedAnswerLibraryRepository
    {
        public PredefinedAnswerLibraryRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<bool> DeleteByQuestionLibraryId(int questionLibraryId)
        {
            try
            {
                var data = await _dbSet.Where(s => s.QuestionLibraryId == questionLibraryId).ToListAsync();
                if (data != null && data.Count() > 0)
                    _dbSet.RemoveRange(data);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
