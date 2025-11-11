using Microsoft.AspNetCore.Mvc;

namespace Common.Custom.CustomObjectResults
{
    public class StatusCodeObjectResult : ObjectResult
    {
        public StatusCodeObjectResult(EStatusCodes statusCodes, object? value) : base(value)
        {
            StatusCode = (int)statusCodes;
        }
    }
}
