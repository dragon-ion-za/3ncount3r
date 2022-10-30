import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/EncounterPage.tsx";
import MainLayout from "./components/ui/organisms/MainLayout.tsx";

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