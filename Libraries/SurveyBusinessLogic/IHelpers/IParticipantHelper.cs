

using Common.Models;
using SurveyBusinessLogic.Models;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IParticipantHelper
    {
        public Task<Pagination<ParticipantDTO>> FilterAsync(ParticipantFilterModel filter);
        public Task<string> ExportExcel(ParticipantFilterModel filter);
        public Task<bool> CreateAsync(ParticipantDTO model);
        public Task<ParticipantDTO?> InitAsync(ParticipantDTO model);
        public Task<bool> AddAnswersAsync(List<AnswerDTO> answers);
        public Task<ParticipantDTO?> GetByIdAsync(Guid id);

    }
}
