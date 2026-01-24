using Common.Custom.ApiKey;
using Lipstick.BLL.ILipstickClientHelpers;
using Microsoft.AspNetCore.Mvc;
using System.Share;

namespace WebCore.Server.Controllers.LipstickClientController
{
    [Route("api/lipstick/[controller]")]
    [ApiController]
    [ApiKey]
    public class HomeBannerClientController : ControllerBase
    {
        private readonly IHomeBannerClientHelper _homeBannerClientHelper;
        public HomeBannerClientController(IHomeBannerClientHelper homeBannerClientHelper)
        {
            _homeBannerClientHelper = homeBannerClientHelper;
        }
        [HttpGet("getAllActive")]
        public IActionResult GetAllActive()
        {
            string language = Request.Headers[Constants.Language].ToString();

            var result = _homeBannerClientHelper.GetAllActive(language);
            return Ok(result);
        }
    }
}
