using DataAccess.DTOs;
using DataAccess.IRepositories;

namespace DataAccess.Repositories
{
    public class UserRepository : GenericRepository<UserDTO>, IUserRepository
    {
        public UserRepository(ApplicationContext dbContext) : base(dbContext)
        {
        }
    }
}
