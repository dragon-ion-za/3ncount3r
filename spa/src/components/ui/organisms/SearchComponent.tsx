import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { CreatureViewModel } from '../../../view-models/creature.view-model.ts';
import { doCreatureSearch } from '../../services/search-service.ts';
import SearchResultComponent from './SearchResultComponent.tsx';

const SearchComponent : React.FC = () => {
    const [creatures, setCreatures] = useState<CreatureViewModel[]>([]);

    const doSearch = (e) => {
        e.preventDefault();

        if (e.target.value.length > 2) {
            doCreatureSearch(e.target.value).then(x => setCreatures(x));            
        }

        return;
    }

    return (
        <>
            <TextField label="Search" variant="standard" sx={{width: '25vw'}} onChange={doSearch} />
            {(creatures.length > 0 && 
                <Stack sx={{width: '25vw', position: 'absolute'}}>
                    {creatures.map((creature: CreatureViewModel) => (
                        <SearchResultComponent viewModel={creature} />
                    ))}
                </Stack>)
            }
        </>
    );

}

export default SearchComponent;