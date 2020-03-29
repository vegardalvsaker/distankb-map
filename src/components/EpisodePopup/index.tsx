import React, { useState } from 'react'
import { Popup } from 'react-leaflet'
import useMetadata from '../../hooks/useMetadata'
import styles from './styles.module.css'
import { Metadata } from '../../types/Metadata'

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
                    <h2>{metadata.episodeTitle}</h2>
                    <h3>Sesong: {metadata.seasonNumber}</h3>
                    <h3>Episode: #{metadata.episodeNumber}</h3>

                    <p className={styles.description}>
                        {metadata.shortDescription}
                    </p>
                    <PopupImage metadata={metadata} />
                    <a
                        href={`https://tv.nrk.no/program/${metadata.id}`}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        Se episoden
                    </a>
                </>
            ) : null}
        </>
    )
}

type PopupImageProps = {
    metadata: Metadata | undefined
}

const PopupImage: React.FC<PopupImageProps> = props => {
    const [imgLoading, setImgLoading] = useState(true)
    const { metadata } = props
    return (
        <>
            {metadata ? (
                <>
                    <img
                        className={styles.thumbnail}
                        alt={metadata.episodeTitle}
                        onLoad={e => setImgLoading(false)}
                        src={metadata.image.webImages[3].imageUrl}
                    ></img>
                    {imgLoading ? (
                        <p className="img-loader">'loading'</p>
                    ) : null}
                </>
            ) : null}
        </>
    )
}
