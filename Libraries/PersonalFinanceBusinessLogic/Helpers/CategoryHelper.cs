using Common.Models;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.Helpers
{
    public class CategoryHelper : ICategoryHelper
    {
        public Task<bool> CreateAsync(CategoryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<CategoryDTO>> GetAllAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<Pagination<CategoryDTO>> GetAllDeletedAsync(int pageIndex, int pageSize)
        {
            throw new NotImplementedException();
        }

        public Task<CategoryDTO?> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> RestoreAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SoftDeleteAsync(int id, string? userName = null)
        {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateAsync(CategoryDTO model, string? userName = null)
        {
            throw new NotImplementedException();
        }
    }
}
