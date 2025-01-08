import { PartyViewModel } from "../../view-models/party.view-model";

export interface IPartyContext {
    parties: PartyViewModel[];
    selectedPartyIndex: number;
    setParties: (parties: PartyViewModel[]) => void;
    setSelectedPartyIndex: (index: number) => void;
    getSelectedParty: () => PartyViewModel;
}