using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess.Repositories
{
    public class ExpenseRepository : GenericRepository<ExpenseDTO>, IExpenseRepository
    {
        public ExpenseRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
