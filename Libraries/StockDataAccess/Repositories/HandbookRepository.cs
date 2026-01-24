using Stock.DAL.DTOs;
using Stock.DAL.IRepositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Stock.DAL.Repositories
{
    public class HandbookRepository : GenericRepository<HandbookDTO>, IHandbookRepository
    {
        public HandbookRepository(ApplicationContext context) : base(context)
        {
        }
    
    }
}
