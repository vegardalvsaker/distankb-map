import React, { useState } from 'react'
import { Popup } from 'react-leaflet'
import classnames from 'classnames'
import useMetadata from '../../hooks/useMetadata'
import styles from './styles.module.css'

type EpisodePopupProps = {
    programId: string
}

const EpisodePopup: React.FC<EpisodePopupProps> = (props) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <Popup onOpen={() => setIsOpen(true)}>
                {isOpen ? <PopupContent programId={props.programId} /> : null}
            </Popup>
        </>
    )
}
export default EpisodePopup

type PopupContentProps = {
    programId: string
}

const PopupContent: React.FC<PopupContentProps> = (props) => {
    const { metadata } = useMetadata(props.programId)

    return (
        <>
            {metadata ? (
                <>
                    <div className={styles.popupContentContainer}>
                        <h1 className={styles.title}>
                            {metadata.episodeTitle}
                        </h1>
                        <h2>Sesong: {metadata.seasonNumber}</h2>
                        <h2>Episode: #{metadata.episodeNumber}</h2>
                        <p className={styles.description}>
                            {metadata.shortDescription}
                        </p>
                    </div>

                    <img
                        className={styles.thumbnail}
                        alt={metadata.episodeTitle}
                        src={metadata.image.webImages[3].imageUrl}
                    ></img>

                    <span
                        className={classnames(
                            styles.label,
                            styles.labelInlineBlock
                        )}
                    >
                        <a
                            className={styles.linkToEpisode}
                            href={`https://tv.nrk.no/program/${metadata.id}`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Sjå episoden
                        </a>
                    </span>
                </>
            ) : null}
        </>
    )
}
