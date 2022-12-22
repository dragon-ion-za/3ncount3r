import { createBrowserRouter } from "react-router-dom";

import { EncounterPage } from "./components/pages/encounter/encounter.page.tsx";
import MainLayout from "./components/ui/organisms/mainLayout/mainLayout.tsx";

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