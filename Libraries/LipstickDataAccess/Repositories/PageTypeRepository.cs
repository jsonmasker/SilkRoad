using LipstickDataAccess.DTOs;
using LipstickDataAccess.IRepositories;

namespace LipstickDataAccess.Repositories
{
    public class PageTypeRepository : GenericRepository<PageTypeDTO>, IPageTypeRepository
    {
        public PageTypeRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}