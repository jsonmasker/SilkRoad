using StockDataAccess.DTOs;

namespace StockBusinessLogic.IHelpers
{
    public interface ICompanyHelper : IBaseAsyncHelper<CompanyDTO>
    {
        public Task<List<string>> GetAllSymbolsAsync();
    }
}
