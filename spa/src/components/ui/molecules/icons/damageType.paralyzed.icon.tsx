import { SvgIcon, SvgIconProps, Tooltip } from "@mui/material";
import React from "react";

export function ParalyzedDamageIcon(props: SvgIconProps) {
    return (
      <Tooltip title='Paralyzed'>
        <SvgIcon viewBox='0 0 512 512' {...props}>
          <g>
            <g>
              <g>
                <path d="M409.418,201.38l50.101-136.757h34.105c10.148,0,18.375-8.227,18.375-18.375c0-10.148-8.227-18.375-18.375-18.375
                  h-46.942c-7.71,0-14.601,4.814-17.254,12.054l-21.798,59.498H130.951c-22.659,0-41.093,18.434-41.093,41.093v84.149H56.964
                  c-10.148,0-18.375,8.227-18.375,18.375v57.855c0,10.148,8.227,18.375,18.375,18.375h32.893v65.068
                  c-13.685,5.236-24.584,16.135-29.82,29.82H18.375C8.227,414.162,0,422.39,0,432.538c0,10.148,8.227,18.375,18.375,18.375h41.663
                  c7.421,19.397,26.219,33.214,48.195,33.214c28.446,0,51.589-23.143,51.589-51.589c0-21.976-13.816-40.774-33.214-48.195v-65.068
                  h97.887c-12.403,87.465,55.786,164.853,143.03,164.853c79.663,0,144.474-64.811,144.474-144.474
                  C512,274.554,468.716,219.381,409.418,201.38z M126.609,224.668v-84.149c0-2.395,1.948-4.343,4.343-4.343h263.215l-21.651,59.099
                  c-33.876-1.161-66.156,9.44-92.355,29.393H126.609z M367.524,447.376c-59.399,0-107.724-48.325-107.724-107.724
                  s48.323-107.724,107.724-107.724c59.399,0,107.724,48.325,107.724,107.724C475.249,399.052,426.923,447.376,367.524,447.376z"/>
                <path d="M367.524,261.606c-43.035,0-78.046,35.011-78.046,78.046s35.011,78.047,78.046,78.047s78.046-35.012,78.046-78.047
                  S410.559,261.606,367.524,261.606z"/>
              </g>
            </g>
          </g>
        </SvgIcon>
      </Tooltip>
    );
  }