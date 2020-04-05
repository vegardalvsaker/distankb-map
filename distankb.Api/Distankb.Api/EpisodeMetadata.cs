using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Distankb.Api
{
    public partial class EpisodeMetadata
    {
        [JsonProperty("seriesId")]
        public string SeriesId { get; set; }

        [JsonProperty("seasonDisplayType")]
        public long SeasonDisplayType { get; set; }

        [JsonProperty("seasonId")]
        public string SeasonId { get; set; }

        [JsonProperty("seasonNumber")]
        public string SeasonNumber { get; set; }

        [JsonProperty("episodeNumber")]
        public long EpisodeNumber { get; set; }

        [JsonProperty("episodeNumberOrDate")]
        public string EpisodeNumberOrDate { get; set; }

        [JsonProperty("episodeTitle")]
        public string EpisodeTitle { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("sourceMedium")]
        public long SourceMedium { get; set; }

        [JsonProperty("duration")]
        public string Duration { get; set; }

        [JsonProperty("shortDescription")]
        public string ShortDescription { get; set; }

        [JsonProperty("image")]
        public Image Image { get; set; }

        [JsonProperty("productionYear")]
        public long ProductionYear { get; set; }
    }

    public partial class Image
    {
        [JsonProperty("webImages")]
        public List<WebImage> WebImages { get; set; }
    }

    public partial class WebImage
    {
        [JsonProperty("imageUrl")]
        public Uri ImageUrl { get; set; }

        [JsonProperty("pixelWidth")]
        public long PixelWidth { get; set; }
    }
   
}
