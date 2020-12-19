import { useEffect, useState } from 'react'
import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import { Episode } from '../../types/Episode'
import EpisodePopup from '../EpisodePopup'
import Filter from '../Filter'
import LoadingIndicator from '../LoadingIndicator'
import useMarkers from '../../hooks/useMarkers'

const App: React.FC = () => {
    const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([])
    const [filters, setFilters] = useState<string[]>([])

    const { episodes, isFetching, error } = useMarkers()

    useEffect(() => {
        if (episodes)
            setFilteredEpisodes(
                episodes.filter((e) => filters.includes(e.season))
            )
    }, [episodes, filters])
    return (
        <>
            {isFetching ? (
                <LoadingIndicator />
            ) : (
                <>
                    {!error ? (
                        <div className="grid">
                            <Filter filters={filters} onChange={setFilters} />
                            <MapContainer
                                zoom={5}
                                center={[65.376, 12.524]}
                                style={{ height: '100%' }}
                            >
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
                                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                                />

                                {filteredEpisodes
                                    ? filteredEpisodes.map((e) => (
                                          <React.Fragment key={e.key}>
                                              <Marker position={[e.lat, e.lng]}>
                                                  <EpisodePopup
                                                      programId={e.key}
                                                  />
                                              </Marker>
                                          </React.Fragment>
                                      ))
                                    : null}
                            </MapContainer>
                        </div>
                    ) : (
                        <div className="gradient-background fill-viewport flex">
                            <h1 className="no-margin">
                                Tjenesta er diverre utilgjengeleg
                            </h1>
                        </div>
                    )}
                </>
            )}
        </>
    )
}

export default App
