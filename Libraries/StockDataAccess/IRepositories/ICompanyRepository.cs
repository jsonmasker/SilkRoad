using StockDataAccess.DTOs;

namespace StockDataAccess.IRepositories
{
    public interface ICompanyRepository : IGenericRepository<CompanyDTO>
    {
        public Task<CompanyDTO> GetCompanyBySymbolAsync(string symbol);
    }
}
