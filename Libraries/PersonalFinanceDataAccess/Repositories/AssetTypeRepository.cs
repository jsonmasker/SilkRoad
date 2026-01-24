using PersonalFinance.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.DAL.Repositories
{
    public class AssetTypeRepository : GenericRepository<DTOs.AssetTypeDTO>, IAssetTypeRepository
    {
        public AssetTypeRepository(ApplicationContext context) : base(context)
        {
        }
    }
}
