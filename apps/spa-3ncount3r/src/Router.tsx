import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/encounter/encounter.page";

function createRouter(baseName: string = "/") : any
{ 
    return createBrowserRouter([
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
        },
    ], 
    { 
        basename: baseName
    });
};

export default createRouter;