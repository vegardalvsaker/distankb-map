import { useEffect, useState } from 'react'
import { Episode, EpisodeGeo } from '../types/Episode'
import { getApiUrl } from '../constants'

const url = getApiUrl()

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const [episodes, setEpisodes] = useState<Episode[]>()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    const fetchEpisodes = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            })

            if (!response.ok) {
                setError(true)
                setIsFetching(false)
                return
            }

            const result = (await response.json()) as EpisodeGeo[]

            // Remap the API result object to frontend readable properties.
            const mappedEpisodes: Episode[] = result.map(e => {
                    return {
                        key: e.rowKey,
                        season: e.partitionKey,
                        lat: e.lat,
                        lng: e.lng
                    }
                });
            setEpisodes(mappedEpisodes)
        } catch (ex) {}
        setIsFetching(false)
    }

    useEffect(() => {
        fetchEpisodes()
    }, [])

    return { episodes, isFetching, error }
}
