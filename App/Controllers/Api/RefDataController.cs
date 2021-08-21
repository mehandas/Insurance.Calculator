using Insurance.Calculator.Services.Manager;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Calculator.App.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/refData")]
    [ApiController]
    public class RefDataController : ControllerBase
    {
        private readonly IReferenceDataManager _refDataManager;
        public RefDataController(IReferenceDataManager refDataManager)
        {
            _refDataManager = refDataManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var response = _refDataManager.GetReferenceData();
            return Ok(response);
        }
    }
}
