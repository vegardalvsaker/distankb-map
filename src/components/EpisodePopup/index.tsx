import React from 'react'
import { Popup } from 'react-leaflet'
import useMetadata from '../../hooks/useMetadata'
import styles from './styles.module.css'

type EpisodePopupProps = {
    prId: string
}

const EpisodePopup: React.FC<EpisodePopupProps> = props => {
    const { metadata, isFetching } = useMetadata(props.prId)

    return (
        <>
            {isFetching ? <pre>Loading</pre> : null}
            {metadata ? (
                <Popup>
                    <h2>{metadata.episodeTitle}</h2>
                    <h3>Sesong: {metadata.seasonNumber}</h3>
                    <h3>Episode: #{metadata.episodeNumber}</h3>

                    <p className={styles.description}>
                        {metadata.shortDescription}
                    </p>
                    <a
                        href={metadata._links.share.href}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Se episoden
                    </a>
                    <img
                        className={styles.thumbnail}
                        alt={metadata.episodeTitle}
                        src={metadata.image.webImages[3].imageUrl}
                    ></img>
                </Popup>
            ) : null}
        </>
    )
}
export default EpisodePopup
