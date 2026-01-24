using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.Repositories
{
    public class TradeHistoryRepository : GenericRepository<TradeHistoryDTO>, ITradeHistoryRepository
    {
        public TradeHistoryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
