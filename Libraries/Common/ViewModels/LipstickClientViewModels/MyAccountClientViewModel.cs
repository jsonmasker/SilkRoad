using Common.Models;

namespace Common.ViewModels.LipstickClientViewModels
{
    public class MyAccountClientViewModel
    {
        public Pagination<ProductClientViewModel>? FavoriteProducts { get; set; }
        public UserClientViewModel? UserInfor { get; set; }
        public ChangePasswordClientViewModel? ChangePassword { get; set; }

    }
}
