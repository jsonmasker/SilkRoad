using Common;
using Common.ViewModels.LipstickClientViewModels;
using MemberBusinessLogic.IHelpers;
using MemberDataAccess;

namespace MemberBusinessLogic.Helpers
{
    public class GenderHelper : IGenderHelper
    {
        private readonly IUnitOfWork _unitOfWork;
        public GenderHelper(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public IEnumerable<GenderClientViewModel> GetAll(string language)
        {
            var data = _unitOfWork.GenderRepository.GetAll().Select(x => new GenderClientViewModel
            {
                Id = x.Id,
                Name = language == ELanguages.VN.ToString() ? x.NameVN : x.NameEN
            });
            return data;
        }
    }
}
