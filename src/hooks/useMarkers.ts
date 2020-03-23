import { useEffect, useState } from 'react'
import { EpisodeGeo } from '../types/EpisodeGeo'

export default () => {
    const [episodes, setEpisodes] = useState<EpisodeGeo[]>()
    const [isFetching, setIsFetching] = useState(false)

    const fetchEpisodes = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(
                'https://localhost:44397/api/deringenskulletru',
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                }
            )
            const result = (await response.json()) as EpisodeGeo[]
            setEpisodes(result)
        } catch (ex) {}
        setIsFetching(false)
    }

    useEffect(() => {
        fetchEpisodes()
    }, [])

    return { episodes, isFetching }
}
