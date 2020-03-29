using Microsoft.Azure.Cosmos.Table;

namespace Distankb.Api
{
    public class EpisodeGeoEntity : TableEntity
    {
        public double Lat { get; set;}
        public double Lng { get; set; }


        public EpisodeGeoEntity(string partitionKey, string rowKey) :base(partitionKey, rowKey)
        {

        }

        public EpisodeGeoEntity()
        {

        }
    }
}
