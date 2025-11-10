using Common.Custom.CustomDataAnnotations;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class RecoverPasswordClientViewModel
    {
        [PhoneNumberValidation]
        public required string PhoneNumber { get; set; }
    }
}
