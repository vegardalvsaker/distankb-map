export type Metadata = {
    _links: {
        share: {
            href: string
        }
    }
    episodeTitle: string
    seasonNumber: string
    episodeNumber: string
    id: string
    shortDescription: string
    image: {
        webImages: {
            imageUrl: string
            pixelWidth: number
        }[]
    }
    productionYear: number
}
