import { Container, DialogContent, Modal, Pagination, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useRef, useState } from 'react';

import { useOnClickOutside } from '../../../hooks/useOnClickOutside.hook';
import { doCreatureSearch } from '../../../services/search.service';
import { useEncounterContext } from '../../../contexts/encounter.context-provider';
import { ConfigureCreatureModal } from '../modals/configureCreature.modal';
import SearchCreatureListItem from '../searchCreatureListItem/searchCreatureListItem';

import { CreatureViewModel } from '../../../../view-models/creature.view-model';
import { EncounterCreatureViewModel } from '../../../../view-models/encounter-creature.view-model';

import { searchContainerStyles, searchResultContainerStyle } from './searchCreatures.styles'

const SearchCreatures : React.FC = () => {
    const encounterContext = useEncounterContext();

    const [creatures, setCreatures] = useState<CreatureViewModel[]>([]);
    const [selectedCreature, setSelectedCreature] = useState<CreatureViewModel>();
    const [hasFocus, setHasFocus] = useState<boolean>(false);
    const [open, setOpen] = useState(false);
    const itemsPerPage = 5;
    const [page, setPage] = React.useState(1);
    const [noOfPages, setNoOfPages] = React.useState(0);

    const handleChange = (event: any, value: any) => {
        setPage(value);
    };

    const wrapperRef = useRef(null);
    useOnClickOutside(wrapperRef, () => { setHasFocus(false); }, () => { setHasFocus(true); });

    const doSearch = (e: any) => {
        e.preventDefault();
        setHasFocus(true);

        if (e.target.value.length > 2) {
            doCreatureSearch(e.target.value)
                .then(foundCreatures => { 
                    let pages = Math.ceil(foundCreatures.length / itemsPerPage);
                    setNoOfPages(pages);
                    setPage(1);
                    setCreatures(foundCreatures); 
                });
        }

        return;
    }

    const doCreatureSelect = (viewModel: CreatureViewModel) => {
        setSelectedCreature(viewModel);
        toggleModal(true);
    }

    const toggleModal = (open: boolean) => {
        setOpen(open);
    }

    const acceptHandler = (encounterCreature: EncounterCreatureViewModel) => {
        encounterContext.addCreature(encounterCreature);
        toggleModal(false);
    };

    return (
        <Container sx={searchContainerStyles} ref={wrapperRef}>
            <TextField label="Search" variant="standard" sx={{width: '25vw'}} onChange={doSearch} />

            {(hasFocus && creatures.length > 0 && 
                <Stack sx={searchResultContainerStyle}>
                    {creatures
                    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                    .map((creature: CreatureViewModel) => (
                        <SearchCreatureListItem key={creature.name} viewModel={creature} selectCreature={doCreatureSelect} />
                    ))}

                    <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange} />
                </Stack>)
            }

            <Modal 
            open={open}
            disablePortal>
                <DialogContent>
                    <ConfigureCreatureModal
                        viewModel={selectedCreature!} 
                        handleCancel={() => toggleModal(false)} 
                        handleAccept={acceptHandler}/>
                </DialogContent>
            </Modal>
        </Container>
    );

}

export default SearchCreatures;