import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/encounter/encounter.page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <EncounterPage />
    },
    {
        path: '/encounter',
        element: <EncounterPage />
    },
    {
        path: '/:id',
        element: <EncounterPage />
    },
    {
        path: '/:id/template',
        element: <EncounterPage />
    }
]);

export default router;