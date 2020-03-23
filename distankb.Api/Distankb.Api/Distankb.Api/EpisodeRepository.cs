using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Distankb.Api
{
    public class EpisodeRepository
    {
        private CloudTableClient _cloudTableClient;

        public EpisodeRepository(CloudTableClient client)
        {
            _cloudTableClient = client;
        }

        private async Task<CloudTable> _getGetCloudTable()
        {
            var cloudTable = _cloudTableClient.GetTableReference("DerIngenSkulleTru");
            await cloudTable.CreateIfNotExistsAsync();
            return cloudTable;
        }

        public async Task<IEnumerable<EpisodeEntity>> GetAllEpisodes()
        {
            TableQuery<EpisodeEntity> query = new TableQuery<EpisodeEntity>()
                .Where(TableQuery.GenerateFilterCondition(
                    nameof(EpisodeEntity.PartitionKey),
                    QueryComparisons.NotEqual,
                    "null"
                    ));
            var cloudTable = await _getGetCloudTable();
            TableContinuationToken token = null;
            List<EpisodeEntity> episodes = new List<EpisodeEntity>();

            do
            {
                TableQuerySegment<EpisodeEntity> resultSegment = await cloudTable.ExecuteQuerySegmentedAsync(query, token);
                token = resultSegment.ContinuationToken;
                episodes.AddRange(resultSegment.Results);
            } while (token != null);

            return episodes;
        }
        
    }
}
