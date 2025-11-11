using Common.Models;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface IWebhookHelper
    {
        public Task<bool> CreateAsync(SepayModel model);
    }
}
