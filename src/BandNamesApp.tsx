import { useEffect, useState } from "react";
import { io } from "socket.io-client";

import BandAdd from './components/BandAdd';
import BandList from './components/BandList';
import { Band } from './interfaces/bandsInterface';

const connectSocketServer = () => {
    const socket = io('http://localhost:8080', {
        transports: [ 'websocket' ]
    });
    return socket;
}

const BandNamesApp = () => {
    
    const [ socket ] = useState( connectSocketServer() );
    const [ online, setOnline ] = useState( false );
    const [ bands, setBands ] = useState<Band[]>( [] );

    useEffect(() => {
        
        setOnline( socket.connected );

    }, [ socket ])

    useEffect(() => {
        
        socket.on('connect', () => {
            setOnline( true );
        })

    }, [ socket ]);

    useEffect(() => {

        socket.on('disconnect', () => {
            setOnline( false );
        })

    }, [ socket ]);

    useEffect(() => {

        socket.on('current-bands', ( data: Band[] ) => {
            setBands( data );
        })

    }, [ socket ]);

    const vote = (id: string) => {

        socket.emit('vote-band', id);
        
    }

    const deleteBand = ( id: string ) => {

        socket.emit('delete-band', id);
        
    }

    const addBand = ( name: string  ) => {

        socket.emit('add-band', { name });
        
    }

    const updateBandName = ( id: string, name: string ) => {

        socket.emit('update-band-name', { id, name })
        
    }

    return (
        <div className="container">
            
            <div className="alert">
                <p>
                    Service status: 
                    {
                        online
                        ? <span className="text-success"> Online</span>
                        : <span className="text-danger"> Offline</span>
                    }                    
                    
                </p>
            </div>

            <h1>BandNames</h1>
            <hr />

            <div className="row">
                <div className="col-8">
                    <BandList 
                        data={ bands } 
                        vote={ vote } 
                        deleteBand={ deleteBand }
                        updateBandName={ updateBandName } 
                    />
                </div>

                <div className="col-4">
                    <BandAdd
                        addBand={ addBand }
                    />
                </div>
            </div>

        </div>
    )
}

export default BandNamesApp
