using SurveyBusinessLogic.IHelpers;
using SurveyDataAccess;
using SurveyDataAccess.DTOs;

namespace SurveyBusinessLogic.Helpers
{
    public class ParticipantInfoConfigHelper : IParticipantInfoConfigHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public ParticipantInfoConfigHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<ParticipantInfoConfigDTO>> GetAllAsync()
        {
            return await _unitOfWork.ParticipantInfoConfigRepository.GetAllAsync();
        }

        public async Task<ParticipantInfoConfigDTO?> GetByIdAsync(int id)
        {
            return await _unitOfWork.ParticipantInfoConfigRepository.GetByIdAsync(id);
        }

        public async Task<bool> CreateAsync(ParticipantInfoConfigDTO model, string? userName = null)
        {
            model.Create(userName);
            await _unitOfWork.ParticipantInfoConfigRepository.CreateAsync(model);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateAsync(ParticipantInfoConfigDTO model, string? userName = null)
        {
            var data = await _unitOfWork.ParticipantInfoConfigRepository.GetByIdAsync(model.Id);
            if (data == null)
            {
                return false;
            }
            data.Update(userName);
            data.FieldNameEN = model.FieldNameEN;
            data.FieldNameVN = model.FieldNameVN;
            data.PlaceholderEN = model.PlaceholderEN;
            data.PlaceholderVN = model.PlaceholderVN;
            data.Type = model.Type;
            data.MinLength = model.MinLength;
            data.MaxLength = model.MaxLength;
            data.IsRequired = model.IsRequired;
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var surveyForm = await _unitOfWork.SurveyFormRepository.GetByIdAsync(id);
            if (surveyForm == null || surveyForm.IsPublished)
            {
                return false;
            }
            await _unitOfWork.ParticipantInfoConfigRepository.DeleteAsync(id);
            await _unitOfWork.SaveChangesAsync();
            return true;
        }

    }
}
