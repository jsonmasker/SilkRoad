using Microsoft.EntityFrameworkCore;
using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;

namespace SurveyDataAccess.Repositories
{
    public class QuestionGroupLibraryRepository : GenericRepository<QuestionGroupLibraryDTO>, IQuestionGroupLibraryRepository
    {
        public QuestionGroupLibraryRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<IEnumerable<QuestionGroupLibraryDTO>> GetEagerLoadingAsync()
        {
            return await _dbSet.Where(x => !x.IsDeleted && x.IsActive).OrderBy(s => s.Priority)
                .Include(x => x.QuestionLibraries).OrderBy(s => s.Priority).ToListAsync();
        }
    }
}
