using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Common.Services.ConvertWordToPdfServices
{
    public interface IConvertWordToPdfService
    {
        public Task<byte[]?> ConvertWordToPdfAsync(IFormFile file);
    }
}
