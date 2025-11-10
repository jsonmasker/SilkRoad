using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IParticipantInfoConfigHelper
    {
        public Task<IEnumerable<ParticipantInfoConfigDTO>> GetAllAsync();
        public Task<ParticipantInfoConfigDTO?> GetByIdAsync(int id);
        public Task<bool> CreateAsync(ParticipantInfoConfigDTO model, string? userName = null);
        public Task<bool> UpdateAsync(ParticipantInfoConfigDTO model, string? userName = null);
        public Task<bool> DeleteAsync(int id);
    }
}
