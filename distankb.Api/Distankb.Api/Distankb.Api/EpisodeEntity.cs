using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Distankb.Api
{
    public class EpisodeEntity : TableEntity
    {
        public Double Lat { get; set;}
        public Double Lng { get; set; }


        public EpisodeEntity(string partitionKey, string rowKey) :base(partitionKey, rowKey)
        {

        }

        public EpisodeEntity()
        {

        }
    }
}
