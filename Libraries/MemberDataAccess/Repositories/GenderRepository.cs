using MemberDataAccess.DTOs;
using MemberDataAccess.IRepositories;

namespace MemberDataAccess.Repositories
{
    public class GenderRepository : GenericRepository<GenderDTO>, IGenderRepository
    {
        public GenderRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
