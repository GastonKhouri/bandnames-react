import BandScreen from './components/BandScreen';
import { SocketProvider } from './context/socketContext';

const BandNamesApp = () => {

    return (
        <SocketProvider>
            <BandScreen />
        </SocketProvider>
    )
}

export default BandNamesApp
