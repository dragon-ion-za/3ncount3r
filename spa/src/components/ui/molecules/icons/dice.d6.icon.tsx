import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function DiceD6Icon(props: SvgIconProps) {
    return (
      <Tooltip title='D6'>
        <SvgIcon viewBox='0 0 24 24' {...props}>
          <path fill="#000000" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 2v14h14V5H5m8.39 4.53c-2.5-.03-2.53 2-2.53 2s.55-.66 1.67-.66c.66 0 1.97.58 2.02 2.54c.06 2.06-1.78 2.59-1.78 2.59s-3.5.86-3.47-3.34c.03-4.72 4.09-4.33 4.09-4.33v1.2m-1.44 2.57c-.74-.1-1.12.68-1.12.68l.02.72c0 .77.54 1.33 1.15 1.33c.61 0 1.05-.56 1.05-1.33s-.49-1.4-1.1-1.4Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }