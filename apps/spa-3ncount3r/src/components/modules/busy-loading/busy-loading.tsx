import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useBusyLoadingContext } from "apps/spa-3ncount3r/src/providers/busy-loading-context/busy-loading.context-provider";
import React, { useEffect } from "react";

export const BusyLoading : React.FC = () => {     
    const busyLoadingContext = useBusyLoadingContext();

    useEffect(() => {}, [busyLoadingContext]);

    if (busyLoadingContext.getIsLoading()) {
        return (
            <Box sx={{ display: 'grid', width: '100vw', height: '100vh', placeItems: 'center', position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.4)', zIndex: '1201' }}>
              <CircularProgress />
            </Box>);
    } else {
        return (<></>);
    }
    
}