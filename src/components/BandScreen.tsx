import { useContext } from 'react';

import { SocketContext } from '../context/socketContext';

import BandList from './BandList';
import BandAdd from './BandAdd';
import BanChart from './BanChart';

const BandScreen = () => {

    const { online } = useContext( SocketContext );

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
                <div className="col">
                    <BanChart />
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <BandList />
                </div>

                <div className="col-4">
                    <BandAdd />
                </div>
            </div>

        </div>
    )
}

export default BandScreen
