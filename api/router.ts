const express = require("express");

import { CharactersController } from './controllers/characters.controller';
import { CreaturesController } from './controllers/creatures.controller';
import { EncountersController } from './controllers/encounters.controller';
import { EncounterTemplatesController } from './controllers/encounterTemplates.controller';
import { PartiesController } from './controllers/parties.controller';

export const router = express.Router();

router.post('/encounters', new EncountersController().save);
router.put('/encounters', new EncountersController().update);
router.get('/encounters', new EncountersController().get);
router.get('/encounters/:id', new EncountersController().getById);

router.post('/encountertemplates', new EncounterTemplatesController().save);
router.put('/encountertemplates', new EncounterTemplatesController().update);
router.get('/encountertemplates', new EncounterTemplatesController().get);
router.get('/encountertemplates/:id', new EncounterTemplatesController().getById);

router.get('/creatures', CreaturesController.getCreatures);

router.post('/parties', new PartiesController().save);
router.put('/parties', new PartiesController().update);
router.get('/parties', new PartiesController().get);
router.get('/parties/:id', new PartiesController().getById);

router.post('/characters', new CharactersController().save);
router.put('/characters', new CharactersController().update);
router.get('/characters', new CharactersController().get);
router.get('/characters/:id', new CharactersController().getById);