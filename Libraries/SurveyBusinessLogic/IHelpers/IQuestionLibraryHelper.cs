using Common.Models;
using SurveyBusinessLogic.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IQuestionLibraryHelper : IBaseAsyncHelper<QuestionLibraryDTO>
    {
        public Task<QuestionLibraryDTO?> GetEagerLoadingByIdAsync(int id);
        public Task<Pagination<QuestionLibraryDTO>> GetByFilterAsync(QuestionLibraryFilterModel filter);

    }
}
