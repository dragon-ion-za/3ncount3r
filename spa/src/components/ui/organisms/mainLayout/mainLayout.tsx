import React, { useState } from 'react';
import { CSSObject, IconButton, styled, Theme, Typography } from '@mui/material';
import { CSSTransition } from "react-transition-group";
import MuiDrawer from '@mui/material/Drawer'
import { Outlet } from 'react-router';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

import EncountersMenu from '../encountersMenu/encountersMenu';

import { expanderButtonStyles } from './mainLayout.styles';

enum LogoTransitionKeyFrames {
  FullLogo,
  TransitioningToHalfLogo,
  HalfLogo,
  TransitioningToFullLogo
}

const drawerWidth: number = 240;
const drawerCollapsedWidth: number = 64;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: drawerCollapsedWidth
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const MainLayout : React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoTransition, setLogoTransition] = useState(LogoTransitionKeyFrames.HalfLogo);

  const toggleMenu = (event: any) => {
    if (logoTransition !== LogoTransitionKeyFrames.TransitioningToFullLogo && logoTransition !== LogoTransitionKeyFrames.TransitioningToHalfLogo) {
      setIsMenuOpen(!isMenuOpen);
      setLogoTransition(!isMenuOpen ? LogoTransitionKeyFrames.TransitioningToFullLogo : LogoTransitionKeyFrames.TransitioningToHalfLogo);
    }
    
    event.preventDefault();
  }

  const logoKeyframeChange = () => {
    switch (logoTransition) {
      case LogoTransitionKeyFrames.TransitioningToFullLogo : setLogoTransition(LogoTransitionKeyFrames.FullLogo); break;
      
      case LogoTransitionKeyFrames.TransitioningToHalfLogo: setLogoTransition(LogoTransitionKeyFrames.HalfLogo); break;
    }
  }

  return (
    <>
      <Drawer variant='permanent' 
        open={isMenuOpen}
      >
        <CSSTransition
          in={logoTransition === LogoTransitionKeyFrames.FullLogo}
          appear={true}
          unmountOnExit
          classNames="fade"
          timeout={500} 
          onExiting={logoKeyframeChange}
        >
          <Typography sx={{ textAlign: 'center', fontSize: '35px' }}>
            3ncount3r
          </Typography>
        </CSSTransition>
        <CSSTransition
          in={logoTransition === LogoTransitionKeyFrames.HalfLogo}
          appear={true}
          unmountOnExit
          classNames="fade"
          timeout={500}
          onExiting={logoKeyframeChange}
        >
          <Typography sx={{ textAlign: 'center', fontSize: '25px' }}>
            ncntr
          </Typography>
        </CSSTransition>
        <EncountersMenu isExpanded={isMenuOpen} />
        <IconButton sx={expanderButtonStyles} aria-label="expand menu" onClick={toggleMenu}>
            {isMenuOpen 
            ? <ChevronLeft />
            : <ChevronRight />}
        </IconButton>
      </Drawer>
      <Outlet></Outlet>
    </>
  );
};

export default MainLayout;