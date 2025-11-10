using System.ComponentModel.DataAnnotations;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class SecurityCodeClientViewModel
    {
        [Required]
        public required string PhoneNumber { get; set; }
        [Required]
        public string Code { get; set; }
    }
}
