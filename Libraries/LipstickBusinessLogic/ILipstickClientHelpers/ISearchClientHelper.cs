using Common.Models;
using Common.ViewModels.LipstickClientViewModels;

namespace LipstickBusinessLogic.ILipstickClientHelpers
{
    public interface ISearchClientHelper
    {
        public Task<List<ProductClientViewModel>> SuggestProductBySearchTextAsync(string language, string searchText, int quantity = 10);
        public Task<Pagination<ProductClientViewModel>> GetProductSearchResultAsync(string language, string searchText, int pageIndex, int pageSize);
    }
}
