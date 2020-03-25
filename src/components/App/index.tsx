import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet'
import useMarkers from '../../hooks/useMarkers'
import EpisodePopup from '../EpisodePopup'
import { EpisodeGeo } from '../../types/EpisodeGeo'
import Filter from '../Filter'

const App: React.FC = () => {
    const [filteredEpisodes, setFilteredEpisodes] = useState<EpisodeGeo[]>([])
    const [filters, setFilters] = useState<string[]>([
        '2019',
        '2018',
        '2017',
        '2016',
        '2015',
        '2014',
    ])

    const { episodes, isFetching } = useMarkers()

    const customMarker = new L.Icon({
        iconUrl: require('../../assets/marker.png'),
        className: 'leaflet-div-icon',
    })

    useEffect(() => {
        if (episodes)
            setFilteredEpisodes(
                episodes.filter(e => filters.includes(e.partitionKey))
            )
    }, [episodes, filters])
    return (
        <>
            {isFetching ? (
                <pre>Loading</pre>
            ) : (
                <div className="grid">
                    <Filter filters={filters} onChange={setFilters} />

                    <Map
                        zoom={5}
                        center={[65.376, 12.524]}
                        style={{ height: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                        />

                        {filteredEpisodes
                            ? filteredEpisodes.map(e => (
                                  <React.Fragment key={e.rowKey}>
                                      <Marker position={[e.lat, e.lng]}>
                                          <EpisodePopup prId={e.rowKey} />
                                      </Marker>
                                  </React.Fragment>
                              ))
                            : null}
                    </Map>
                </div>
            )}
        </>
    )
}

export default App
