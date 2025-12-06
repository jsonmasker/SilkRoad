using Common.Models;
using PersonalFinanceDataAccess.DTOs;

namespace PersonalFinanceBusinessLogic.IHelpers
{
    public interface ICategoryHelper : IBaseAsyncHelper<CategoryDTO>
    {
        public Task<IEnumerable<OptionModel>> GetTreeOptionListAsync();
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
