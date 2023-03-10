import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function DiceD12Icon(props: SvgIconProps) {
    return (
      <Tooltip title='D12'>
        <SvgIcon viewBox='0 0 24 24' {...props}>
        <path fill="#000000" d="M12 2L1.5 9.64L5.5 22h13l4-12.36L12 2m5 18H7l-3.15-9.6L12 4.47l8.15 5.93L17 20m0-4.25V17h-5.34v-1.09s3.57-3.46 3.57-4.51c0-1.28-1.05-1.15-1.05-1.15c-.68.05-1.18.62-1.18 1.3h-1.56c.06-1.46 1.28-2.61 2.83-2.55c2.47 0 2.5 1.85 2.5 2.3c0 1.77-3.19 4.47-3.19 4.47l3.42-.02M10.5 17H8.89v-6.11L7 11.47v-1.28L10.31 9h.19v8Z"></path>
        </SvgIcon>
      </Tooltip>
    );
  }