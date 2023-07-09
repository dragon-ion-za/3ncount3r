const express = require("express");

import { AdventuresController } from './controllers/adventures.controller';
import { CreaturesController } from './controllers/creatures.controller';

export const router = express.Router();

router.get('/creatures', CreaturesController.getCreatures);
router.get('/creatures/:name', CreaturesController.getCreature);
router.get('/creatures/image/:sourceId/:name', CreaturesController.getCreatureImage);

router.get('/adventures', AdventuresController.getAdventures);
router.get('/adventures/:id', AdventuresController.getAdventureById);