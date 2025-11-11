using SurveyDataAccess.DTOs;

namespace SurveyDataAccess.IRepositories
{
    public interface IQuestionGroupLibraryRepository : IGenericRepository<QuestionGroupLibraryDTO>
    {
        Task<IEnumerable<QuestionGroupLibraryDTO>> GetEagerLoadingAsync();
    }
}
