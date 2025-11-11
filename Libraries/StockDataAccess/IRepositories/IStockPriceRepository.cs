using StockDataAccess.DTOs;

namespace StockDataAccess.IRepositories
{
    public interface IStockPriceRepository : IGenericRepository<StockPriceDTO>
    {
        public Task<StockPriceDTO?> GetLastPriceAsync(int companyId);
    }
}
