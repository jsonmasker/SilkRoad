using PersonalFinanceDataAccess.DTOs;
using PersonalFinanceDataAccess.IRepositories;

namespace PersonalFinanceDataAccess.Repositories
{
    public class SubCategoryRepository : GenericRepository<SubCategoryDTO>, ISubCategoryRepository
    {
        public SubCategoryRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
