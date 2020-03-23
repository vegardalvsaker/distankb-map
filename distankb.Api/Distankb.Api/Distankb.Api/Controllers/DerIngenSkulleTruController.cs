using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Distankb.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DerIngenSkulleTru : ControllerBase
    {
        
        private readonly ILogger<DerIngenSkulleTru> _logger;
        

        public DerIngenSkulleTru(ILogger<DerIngenSkulleTru> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EpisodeEntity>>> GetAllEpisodes([FromServices] EpisodeRepository episodeRepository)
        {
            return Ok(await episodeRepository.GetAllEpisodes());
        }
    }
}
