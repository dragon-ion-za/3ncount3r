const express = require("express");

import { EncountersController } from './controllers/encounters.controller';

export const router = express.Router();

router.post('/encounters', EncountersController.saveEncounter);
router.put('/encounters', EncountersController.updateEncounter);
router.get('/encounters', EncountersController.getEncounters);
router.get('/encounters/:id', EncountersController.getEncounterById);