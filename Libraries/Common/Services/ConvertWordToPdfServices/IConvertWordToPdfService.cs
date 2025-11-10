using Microsoft.AspNetCore.Http;

namespace Common.Services.ConvertWordToPdfServices
{
    public interface IConvertWordToPdfService
    {
        public Task<byte[]?> ConvertWordToPdfAsync(IFormFile file);
    }
}
