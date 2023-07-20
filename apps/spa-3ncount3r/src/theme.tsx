import { createTheme } from "@mui/material";
import "./assets/fonts.css"

var backgroundImageGray = require('./assets/parchmentBackgroundGrayscale.jpg');
var dividerImage = require('./assets/redTriangle.png');

export const theme = createTheme({
    typography: {
        fontFamily: 'ScalySansRemake, MrEavesRemake, Arial'
    },
   components: {
    MuiCssBaseline : {
        styleOverrides: {
            body: {
                
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            root: { 
                width: '64px'
            },
            paperAnchorDockedLeft: {
                width: '64px',
                paddingTop: '64px'
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundColor: '#F2E5B5',
                backgroundImage: `url(${backgroundImageGray})`,
                backgroundBlendMode: 'overlay',
                backgroundAttachment: 'fixed'
            }
        }
    },
    MuiGrid2: {
        styleOverrides: {
            root: {
                paddingLeft: '5px',
                paddingRight: '5px'
            }
        }
    },
    MuiDivider : {
        styleOverrides: {
            root: {
                height: '6px',
                margin: '0.12cm 0',
                backgroundImage: `url(${dividerImage})`,
                backgroundSize: '100% 100%',
                border: 'none'
            }
        }
    },
    MuiTypography: {
        styleOverrides: {
            root: {
                fontFamily: 'MrEavesRemake',
                fontWeight: '800',
                columnSpan: 'all',
            },
            h1: {
                marginBottom: '.18cm',
                fontSize: '.89cm',
                color: '#58180D',
                lineHeight: '1em',
            },
            h2: {
                fontSize: '.75cm',
                lineHeight: '.988em',
                color: '#58180D',
            },
            h3: {
                fontSize: '.575cm',
                lineHeight: '.995em',
                color: '#58180D',
                borderBottom: '2px solid #C0AD6A',
                marginBottom: '.17cm'
            },
            subtitle1: {
                fontFamily: 'ScalySansRemake',
                fontSize: '.304cm',
                fontWeight: 'normal'
            },
            subtitle2: {
                fontFamily: 'ScalySansRemake',
                fontSize: '.325cm',
                color: '#58180D',
                fontWeight: 'normal'
            },
            body1: {
                fontFamily: 'ScalySansRemake',
                fontSize: '.325cm',
                fontWeight: 'normal'
            }
        }
    },
    MuiAccordion: {
        styleOverrides: {
            root: {
                background: 'none',
                border: 'none',
                boxShadow: 'none',
                minHeight: '38px',
                '&:before': {
                    display: 'none'
                },
                '&.Mui-expanded': {
                    margin: '0px !important',
                    minHeight: '38px !important',
                },
                '.Mui-expanded': {
                    minHeight: '38px !important',
                }
            }            
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                width: '100%',
                border: 'none',
                '.Mui-expanded': {
                    margin: '0px !important',
                }
            },
            content : {
                display: 'block',
                margin: '0px'
            }
        }
    }
   }
});