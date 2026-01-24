using PersonalFinance.BLL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.BLL.IHelpers
{
    public interface IAssetReportHelper
    {
        public Task<ICollection<ColoumnModel>> GetColoumnChartAsync(int userId);
        public Task<ICollection<PieModel>> GetPieChartAsync(int userId);

    }
}
