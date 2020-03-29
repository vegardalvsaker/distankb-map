import { useEffect, useState } from 'react'
import { EpisodeGeo } from '../types/EpisodeGeo'
import { getApiUrl } from '../constants'

const url = getApiUrl()

export default () => {
    const [episodes, setEpisodes] = useState<EpisodeGeo[]>()
    const [isFetching, setIsFetching] = useState(false)

    const fetchEpisodes = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(url, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            })
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
