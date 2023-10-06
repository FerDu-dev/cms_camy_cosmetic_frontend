import React, {useState, useEffect} from 'react'
import { Input, Space } from 'antd';

const { Search } = Input;
export const SearchSelectInput = ({}) => {
    const [search, setSearch] = useState('')
    const [options, setOptions] = useState([])
    return (
        <div style={{postion: 'relative'}}>
            <Search 
                style={{position: 'absolute'}}

            />
            <div className='absolute'>

            </div>
        </div>
        
    )
};

export default SearchSelectInput;