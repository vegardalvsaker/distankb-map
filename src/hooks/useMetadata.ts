import { useEffect, useState } from 'react'
import { Metadata } from '../types/Metadata'
import { getApiUrl } from '../constants'

const url = getApiUrl()

export default (prId: string) => {
    const [metadata, setMetadata] = useState<Metadata>()
    const [isFetching, setIsFetching] = useState(false)

    const fetchMetadata = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(`${url}/${prId}`, {
                headers: { 'Content-Type': 'application/json' },
                method: 'GET',
            })
            const result = (await response.json()) as Metadata
            setMetadata(result)
        } catch (ex) {}
        setIsFetching(false)
    }
    useEffect(() => {
        fetchMetadata()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { metadata, isFetching }
}
