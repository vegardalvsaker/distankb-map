export type EpisodeGeo = {
    rowKey: string
    partitionKey: string
    lat: number
    lng: number
}

export type Episode = {
    key: string
    season: string
    lat: number
    lng: number
}