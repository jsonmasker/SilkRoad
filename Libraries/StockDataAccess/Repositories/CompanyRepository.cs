using Microsoft.EntityFrameworkCore;
using StockDataAccess.DTOs;
using StockDataAccess.IRepositories;

namespace StockDataAccess.Repositories
{
    public class CompanyRepository : GenericRepository<CompanyDTO>, ICompanyRepository
    {
        public CompanyRepository(ApplicationContext context) : base(context)
        {
        }

        public async Task<CompanyDTO> GetCompanyBySymbolAsync(string symbol)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Symbol == symbol);
        }
    }
}
