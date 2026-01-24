using Common.Custom.CustomDataAnnotations;
using System.ComponentModel.DataAnnotations;

namespace System.Share.ViewModels.SystemViewModels
{
    public class RecoverPasswordViewModel
    {
        [EmailValidation]
        [Required(ErrorMessage = "Email is required!")]
        public required string Email { get; set; }
    }
}
