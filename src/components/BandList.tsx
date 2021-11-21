import { useState, useEffect } from 'react';

import { Band } from '../interfaces/bandsInterface';

interface Props {
    data: Band[];
    vote: ( id: string ) => void;
    deleteBand: ( id: string ) => void;
    updateBandName: ( id: string, bandName: string ) => void;
}

const BandList = ({ data, vote, deleteBand, updateBandName }: Props) => {

    const [ bands, setBands ] = useState( data );

    useEffect(() => {

        setBands( data );
        
    }, [ data ]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        
        setBands( bands => bands.map( band => {

            if ( band.id === id ) {
                band.name = e.target.value
            }

            return band;

        }))

    }

    const onBlur = (id: string, name: string) => {
        
        updateBandName( id, name )

    }

    const createRows = () => {

        return bands.map( band => (
            <tr key={ band.id }>
                <td>
                    <button 
                        className="btn btn-primary"
                        onClick={ () => vote( band.id ) }
                    > 
                        +1 
                    </button>
                </td>
                <td>
                    <input 
                        type="text" 
                        className="form-control"
                        value={ band.name }
                        onChange={ (e) => handleInputChange( e, band.id ) }
                        onBlur={ () => onBlur( band.id, band.name ) }
                    />
                </td>
                <td> <h3> { band.votes } </h3> </td>
                <td> 
                    <button 
                        className="btn btn-danger"
                        onClick={ () => deleteBand( band.id ) }
                    > 
                        Borrar 
                    </button> 
                </td>
            </tr>
        ))

    }

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>
        </>
    )
}

export default BandList
