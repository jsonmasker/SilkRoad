using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Models
{
    public class ExternalAuthModel
    {
        public string? Provider { get; set; }
        public string? IdToken { get; set; }
    }
}
