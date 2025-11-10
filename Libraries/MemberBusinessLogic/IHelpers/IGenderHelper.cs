using Common.ViewModels.LipstickClientViewModels;

namespace MemberBusinessLogic.IHelpers
{
    public interface IGenderHelper
    {
        public IEnumerable<GenderClientViewModel> GetAll(string language);
    }
}
