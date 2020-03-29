using Microsoft.Azure.Cosmos.Table;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Distankb.Api
{
    public class EpisodeRepository
    {
        private CloudTableClient _cloudTableClient;
        private HttpClient _httpClient;
        public EpisodeRepository(CloudTableClient client, HttpClient httpClient)
        {
            _cloudTableClient = client;
            _httpClient = httpClient;

        }

        private async Task<CloudTable> _getGetCloudTable()
        {             
            var cloudTable = _cloudTableClient.GetTableReference("DerIngenSkulleTru");
            await cloudTable.CreateIfNotExistsAsync();
            return cloudTable;
        }

        public async Task<IEnumerable<EpisodeGeoEntity>> GetAllEpisodesAsync()
        {

            TableQuery<EpisodeGeoEntity> query = new TableQuery<EpisodeGeoEntity>()
                .Where(TableQuery.GenerateFilterCondition(
                    nameof(EpisodeGeoEntity.PartitionKey),
                    QueryComparisons.NotEqual,
                    "null"
                    ));

            var cloudTable = await _getGetCloudTable();
            TableContinuationToken token = null;
            List<EpisodeGeoEntity> episodes = new List<EpisodeGeoEntity>();

            do
            {
                TableQuerySegment<EpisodeGeoEntity> resultSegment = await cloudTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;
                episodes.AddRange(resultSegment.Results);
            } while (token != null);

            return episodes;
        }

        public async Task<EpisodeMetadata> GetEpisodeMetadata(string id)
        {
            try
            {
                _httpClient.DefaultRequestHeaders.Add("Accept", "application/json");
                var request = new HttpRequestMessage(HttpMethod.Get, $"https://psapi.nrk.no/programs/{id}");
                var response = await _httpClient.SendAsync(request);
                using HttpContent content = response.Content;
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true,
                };
                if (response.IsSuccessStatusCode)
                {
                    var responseString = await content.ReadAsStreamAsync();
                    
                    var metadata = await JsonSerializer.DeserializeAsync<EpisodeMetadata>(responseString, options);
                    return metadata;

                } else
                {
                    return null;
                }
            } catch (Exception ex)
            {
                throw ex;
            }
            

        }
        
    }
}
