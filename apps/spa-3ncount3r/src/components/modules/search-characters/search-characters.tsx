import { Container, Pagination, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside.hook';

import { usePartyContext } from 'apps/spa-3ncount3r/src/providers/party-context/party.context-provider';
import { CharacterViewModel } from 'apps/spa-3ncount3r/src/view-models/character.view-model';
import { useAuth0 } from '@auth0/auth0-react';
import { searchContainerStyles, searchResultContainerStyle } from '../search-creatures/search-creatures.styles';
import { doCharacterSearch } from 'apps/spa-3ncount3r/src/services/character.service';
import SearchCharacterListItem from '../search-character-list-item/search-character-list-item';

const SearchCharacters : React.FC = () => {
    const partyContext = usePartyContext();

    const { getAccessTokenSilently } = useAuth0();

    const [characters, setCharacters] = useState<CharacterViewModel[]>([]);
    const [selectedCharacter, setSelectedCharacter] = useState<CharacterViewModel>();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const itemsPerPage = 5;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(0);

    const handleChange = (event: any, value: any) => {
        setPage(value);
    };

    const wrapperRef = useRef(null);
    useOnClickOutside(wrapperRef, () => { setHasFocus(false); }, () => { setHasFocus(true); });

    const doSearch = async (e: any) => {
        e.preventDefault();
        setHasFocus(true);

        if (e.target.value.length > 2) {
            let accessToken = await getAccessTokenSilently({ authorizationParams: { audience: 'https://api.3ncount3r.co.za' } });
            let foundCharacters = await doCharacterSearch(accessToken, e.target.value);
            let pages = Math.ceil(foundCharacters.length / itemsPerPage);
            setNoOfPages(pages);
            setPage(1);
            setCharacters(foundCharacters); 
        }

        return;
    }

    const doCreatureSelect = (viewModel: CharacterViewModel) => {
        let state = partyContext.currentParty;
        state.characters.push(viewModel);
        partyContext.setCurrentParty({...state});
    }

    return (
        <Container sx={searchContainerStyles} ref={wrapperRef}>
            <TextField label="Search" variant="standard" sx={{width: '25vw'}} onChange={doSearch} />

            {(hasFocus && characters.length > 0 && 
                <Stack sx={searchResultContainerStyle}>
                    {characters
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((creature: CharacterViewModel) => (
                        <SearchCharacterListItem key={creature.name} viewModel={creature} selectCreature={doCreatureSelect} />
                    ))}

                    <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange} />
                </Stack>)
            }
        </Container>
    );

}

export default SearchCharacters;