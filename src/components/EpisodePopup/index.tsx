import React, { useState } from 'react'
import { Popup } from 'react-leaflet'
import classnames from 'classnames'
import useMetadata from '../../hooks/useMetadata'
import styles from './styles.module.css'

type EpisodePopupProps = {
    prId: string
}

const EpisodePopup: React.FC<EpisodePopupProps> = props => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Popup onOpen={() => setIsOpen(true)}>
                {isOpen ? <PopupContent prId={props.prId} /> : null}
            </Popup>
        </>
    )
}
export default EpisodePopup

type PopupContentProps = {
    prId: string
}

const PopupContent: React.FC<PopupContentProps> = props => {
    const { metadata } = useMetadata(props.prId)

    return (
        <>
            {metadata ? (
                <>
                    <h1>{metadata.episodeTitle}</h1>
                    <h2>Sesong: {metadata.seasonNumber}</h2>
                    <h2>Episode: #{metadata.episodeNumber}</h2>
                    <p className={styles.description}>
                        {metadata.shortDescription}
                    </p>
                    <span
                        className={classnames(
                            styles.label,
                            styles.labelInlineBlock
                        )}
                    >
                        <a
                            id="link-to-episode"
                            href={`https://tv.nrk.no/program/${metadata.id}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Sjå episoden
                        </a>
                    </span>
                    <img
                        className={styles.thumbnail}
                        alt={metadata.episodeTitle}
                        src={metadata.image.webImages[3].imageUrl}
                    ></img>
                </>
            ) : null}
        </>
    )
}
