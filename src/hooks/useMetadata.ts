import { useEffect, useState } from 'react'
import { Metadata } from '../types/Metadata'

export default (prId: string) => {
    const [metadata, setMetadata] = useState<Metadata>()
    const [isFetching, setIsFetching] = useState(false)

    const fetchMetadata = async () => {
        setIsFetching(true)
        try {
            const response = await fetch(
                `https://psapi.nrk.no/programs/${prId}`,
                {
                    headers: { 'Content-Type': 'application/json' },
                    method: 'GET',
                }
            )
            const result = (await response.json()) as Metadata
            console.log(result)
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
