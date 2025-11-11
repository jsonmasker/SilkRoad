using SurveyDataAccess.DTOs;
using SurveyDataAccess.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyDataAccess.Repositories
{
    public class StoreRepository : GenericRepository<StoreDTO>, IStoreRepository
    {
        public StoreRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
