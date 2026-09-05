import { PartyViewModel } from "../../view-models/party.view-model";

export interface IPartyContext {
    parties: PartyViewModel[];
    selectedPartyIndex: number;
    currentParty: PartyViewModel;
    setParties: (parties: PartyViewModel[]) => void;
    setSelectedPartyIndex: (index: number) => void;
    setCurrentParty: (party: PartyViewModel) => void;
    getSelectedParty: () => PartyViewModel;
}