import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function DiceD4Icon(props: SvgIconProps) {
    return (
      <Tooltip title='D4'>
        <SvgIcon viewBox='0 0 24 24' {...props}>
            <path fill="#000000" d="M13.43 15.15h.86v1.21h-.86V18h-1.51v-1.64h-3.1l-.07-.95l3.16-4.99h1.52v4.73m-3.18 0h1.67v-2.68l-1.67 2.68M22 21H2c-.36 0-.69-.19-.87-.5a.97.97 0 0 1 .02-1l10-16.5c.35-.62 1.35-.62 1.71 0l10 16.5A.993.993 0 0 1 22 21M3.78 19h16.45L12 5.43L3.78 19Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }