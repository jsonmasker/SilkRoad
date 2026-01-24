using System;
using System.Collections.Generic;
using System.Text;

namespace PersonalFinance.BLL.Models
{
    public class ColoumnModel
    {
        public required string Category { get; set; }
        public double Value { get; set; }
    }
}
