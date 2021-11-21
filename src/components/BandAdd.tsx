import { useState } from 'react';

interface Props {
    addBand: ( name: string ) => void;
}

const BandAdd = ({ addBand }: Props) => {

    const [ value, setValue ] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        setValue( e.target.value );

    }

    const handleSubmit = ( e: React.FormEvent ) => {

        e.preventDefault()

        if( value.trim().length > 0 ) {
            addBand( value.trim() );
            setValue( '' );
        }
        
    }

    return (
        <>
            <h3>Agregar Banda</h3>

            <form onSubmit={ handleSubmit }>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Nuevo nombre de banda" 
                    onChange={ handleInputChange }
                    value={ value }
                />
            </form>
        </>
    )
}

export default BandAdd
