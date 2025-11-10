using Common.Models;
using SurveyDataAccess.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SurveyBusinessLogic.IHelpers
{
    public interface IStoreHelper : IBaseAsyncHelper<StoreDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
