using Common.Models;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface IExpenseHelper
    {
        public Task<Pagination<ExpenseDTO>> GetAllAsync(int pageIndex, int pageSize);
        public Task<Pagination<ExpenseDTO>> GetAllDeletedAsync(int pageIndex, int pageSize);
        public Task<ExpenseDTO?> GetByIdAsync(int id);
        public Task<bool> CreateAsync(ExpenseDTO model, string? userName = null);
        public Task<bool> UpdateAsync(ExpenseDTO model, string? userName = null);
        public Task<bool> DeleteAsync(int id);
    }
}
