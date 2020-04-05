using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Distankb.Api
{
    public class EpisodeService
    {
        private readonly IMemoryCache _memoryCache;
        private readonly EpisodeRepository _episodeRepository;
        public EpisodeService(IMemoryCache memoryCache, EpisodeRepository episodeRepository)
        {
            _memoryCache = memoryCache;
            _episodeRepository = episodeRepository;
        }

        public async Task<IEnumerable<EpisodeGeoEntity>> GetAllEpisodesAsync()
        {
            return await GetCachedEpisodesAsync();
        }

        public async Task<EpisodeMetadata> GetEpisodeMetadataAsync(string id)
        {
            return await _episodeRepository.GetEpisodeMetadata(id);
        }

        private async Task<IEnumerable<EpisodeGeoEntity>> GetCachedEpisodesAsync()
        {
            return await _memoryCache.GetOrCreateAsync("Episodes", async cacheEntry =>
            {
                return await _episodeRepository.GetAllEpisodesAsync();
            });
        }

        
    }
}
