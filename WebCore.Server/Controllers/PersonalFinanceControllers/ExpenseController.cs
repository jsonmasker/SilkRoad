using Common;
using Common.Models;
using Common.Services.ActionLoggingServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using PersonalFinanceBusinessLogic.IHelpers;
using PersonalFinanceDataAccess.DTOs;
using WebCore.Server.Controllers.BaseApiControllers;

namespace WebCore.Server.Controllers.PersonalFinanceControllers
{
    [Route("api/pf/[controller]")]
    [ApiController]
    [Authorize]
    public class ExpenseController : BaseApiController
    {
        private readonly IExpenseHelper _helper;
        private readonly IActionLoggingService _actionLog;
        private readonly IStringLocalizer<SharedResource> _localizer;
        public ExpenseController(IExpenseHelper helper,
        IActionLoggingService actionLog, IStringLocalizer<SharedResource> localizer)
        {
            _helper = helper;
            _actionLog = actionLog;
            _localizer = localizer;
        }

        [HttpGet("getAll/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAll(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
            {
                return Failed(EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            }
            Pagination<ExpenseDTO> data = await _helper.GetAllAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getAllDeleted/{pageIndex}/{pageSize}")]
        public async Task<IActionResult> GetAllDeleted(int pageIndex, int pageSize)
        {
            if (pageIndex < 1 || pageSize < 1)
                return Failed(Common.EStatusCodes.BadRequest, _localizer["invalidPageIndex"]);
            var data = await _helper.GetAllDeletedAsync(pageIndex, pageSize);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpGet("getById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var data = await _helper.GetByIdAsync(id);
            if (data == null)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(data, _localizer["dataFetchedSuccessfully"]);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] ExpenseDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.CreateAsync(model, userName);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["createFailed"]);
            return Succeeded(_localizer["createSuccess"]);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] ExpenseDTO model)
        {
            if (model == null || !ModelState.IsValid)
                return Failed(EStatusCodes.BadRequest, _localizer["invalidData"]);
            var userName = User.Identity?.Name;
            var result = await _helper.UpdateAsync(model, userName);
            if (!result)
                return Failed(EStatusCodes.InternalServerError, _localizer["updateFailed"]);
            return Succeeded(_localizer["updateSuccess"]);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _helper.DeleteAsync(id);
            if (!result)
                return Failed(EStatusCodes.NotFound, _localizer["notFound"]);
            return Succeeded(_localizer["deleteSuccess"]);
        }

    }
}