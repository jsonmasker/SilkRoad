using PersonalFinance.DAL.DTOs;
using PersonalFinance.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.DAL.Repositories
{
    public class ResourceTypeRepository : GenericRepository<ResourceTypeDTO>, IResourceTypeRepository
    {
        public ResourceTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
