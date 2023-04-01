const express = require("express");

import { CreaturesController } from './controllers/creatures.controller';
import { EncountersController } from './controllers/encounters.controller';
import { EncounterTemplatesController } from './controllers/encounterTemplates.controller';
import { PartiesController } from './controllers/parties.controller';

export const router = express.Router();

router.post('/encounters', EncountersController.saveEncounter);
router.put('/encounters', EncountersController.updateEncounter);
router.get('/encounters', EncountersController.getEncounters);
router.get('/encounters/:id', EncountersController.getEncounterById);

router.post('/encountertemplates', EncounterTemplatesController.saveEncounterTemplate);
router.put('/encountertemplates', EncounterTemplatesController.updateEncounterTemplate);
router.get('/encountertemplates', EncounterTemplatesController.getEncounterTemplates);
router.get('/encountertemplates/:id', EncounterTemplatesController.getEncounterTemplateById);

router.get('/creatures', CreaturesController.getCreatures);

router.post('/parties', PartiesController.saveParty);
router.put('/parties', PartiesController.updateParty);
router.get('/parties', PartiesController.getParties);
router.get('/parties/:id', PartiesController.getPartyById);
