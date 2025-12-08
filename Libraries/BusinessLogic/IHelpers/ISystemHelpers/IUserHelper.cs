using Common.Models;
using Common.ViewModels.SystemViewModels;

namespace BusinessLogic.IHelpers.ISystemHelpers
{
    public interface IUserHelper
    {
        //public Task<Pagination<UserViewModel>> GetAllAsync(int pageIndex, int pageSize);
        public Task<UserViewModel> GetByIdAsync(int id);
        public Task<bool> CreateAsync(UserViewModel model);
        public Task<bool> UpdateAsync(UserViewModel model);
        public Task<Pagination<UserViewModel>> GetAllAsync(int pageIndex, int pageSize, int roleId, string textSearch);
        public Task<bool> DeactivateUserAsync(int Id, string? userName);
        public Task<bool> ActivateUserAsync(int Id, string? userName);
    }
}
