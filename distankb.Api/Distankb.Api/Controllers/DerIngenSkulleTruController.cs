using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Distankb.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DerIngenSkulleTru : ControllerBase
    {
        public DerIngenSkulleTru()
        { 
        }
         
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EpisodeGeoEntity>>> GetAllEpisodes([FromServices] EpisodeService episodeService)
        {
            try
            {
                return Ok(await episodeService.GetAllEpisodesAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EpisodeMetadata>> GetOneEpisode(string id,[FromServices] EpisodeService episodeService)
        {
            try
            {
                return Ok(await episodeService.GetEpisodeMetadataAsync(id));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
