using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess.Repositories
{
    public class IncomeRepository : GenericRepository<IncomeDTO>, IIncomeRepository
    {
        public IncomeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
