using Stock.DAL.DTOs;
using StockDataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.IRepositories
{
    public interface ITradeHistoryRepository : IGenericRepository<TradeHistoryDTO>
    {
    }
}
