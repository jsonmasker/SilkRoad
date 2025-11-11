using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionLibraryRepository : IGenericRepository<QuestionLibraryDTO>
    {
        public Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id);
    }
}
