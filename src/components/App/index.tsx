import React from 'react'
import { Map, TileLayer, Marker } from 'react-leaflet'
import useMarkers from '../../hooks/useMarkers'
import EpisodePopup from '../EpisodePopup'

const App: React.FC = () => {
    const { episodes, isFetching } = useMarkers()

    return (
        <>
            {isFetching ? (
                <pre>Loading</pre>
            ) : (
                <Map
                    zoom={5}
                    center={[65.376, 12.524]}
                    style={{ height: 'inherit' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />

                    {episodes
                        ? episodes.map(e => (
                              <React.Fragment key={e.rowKey}>
                                  <Marker position={[e.lat, e.lng]}>
                                      <EpisodePopup prId={e.rowKey} />
                                  </Marker>
                              </React.Fragment>
                          ))
                        : null}
                </Map>
            )}
        </>
    )
}

export default App
