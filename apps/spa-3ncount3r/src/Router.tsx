import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/encounter/encounter.page";

const router = createBrowserRouter([
    {
        path: 'encounter',
        element: <EncounterPage />
    },
    {
        path: 'encounter/:id',
        element: <EncounterPage />
    },
    {
        path: 'encounter/:id/template',
        element: <EncounterPage />
    }
]);

export default router;