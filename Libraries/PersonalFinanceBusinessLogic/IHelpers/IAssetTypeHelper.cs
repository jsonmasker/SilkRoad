using PersonalFinance.DAL.DTOs;
using System;
using System.Collections.Generic;
using System.Share.Models;
using System.Text;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IAssetTypeHelper : IBaseAsyncHelper<AssetTypeDTO>
    {
        public Task<IEnumerable<OptionModel>> GetOptionListAsync();
    }
}
