import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function DiceD20Icon(props: SvgIconProps) {
    return (
      <Tooltip title='D20'>
        <SvgIcon viewBox='0 0 24 24' {...props}>
          <path fill="#000000" d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18c-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18c.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9M12 4.15L5 8.09v7.82l7 3.94l7-3.94V8.09l-7-3.94m2.93 4.12a2.57 2.57 0 0 1 2.57 2.57v2.66c0 1.4-1.15 2.55-2.57 2.55c-1.43 0-2.57-1.15-2.57-2.55v-2.66a2.57 2.57 0 0 1 2.57-2.57m-.01 1.44c-.58 0-1.06.47-1.06 1.06v2.76c0 .59.48 1.07 1.06 1.07c.58 0 1.08-.48 1.08-1.07v-2.76c0-.59-.5-1.06-1.08-1.06m-3.47 5.05v1.2l-5.14-.03v-1.02s3.43-3.33 3.44-4.34c0-1.24-1.02-1.11-1.02-1.11s-.98.04-1.09 1.25l-1.5.05s.04-2.5 2.69-2.5c2.37 0 2.4 1.78 2.4 2.24c0 1.68-3.08 4.27-3.08 4.27l3.3-.01Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }