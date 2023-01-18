import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/encounter/encounter.page";
import MainLayout from "./components/ui/organisms/mainLayout/mainLayout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: 'encounter',
                element: <EncounterPage />
            },
            {
                path: 'encounter/:id',
                element: <EncounterPage />
            }
        ]
    }
]);

export default router;