export const encounterCreatureCardStyles = {
    margin: '5px',
    ":hover": { 
        boxShadow: '2px 2px 5px 3px #817a5e'
    }
};

export const encounterCreatureChipStyle = {
    margin: '2px',
    width: '88px',
    height: '32px'
}

export const encounterCreatureChipContainer = {
    padding: '0px !important'
}

export const creatureAvatarStyle = {
    width: 64, 
    height: 64, 
    margin: '5px'
}

export const creatureDeathStateStyle = {
    ...creatureAvatarStyle,
    'img': {
        filter: 'grayscale(100%)',
    },
    ':before, :after': {
        position: 'absolute',
        content: '""',
        background: 'red',
        display: 'block',
        width: '100%',
        height: '16px',
        transform: 'rotate(-45deg)',
        left: '0',
        right: '0',
        top: '0',
        bottom: '0',
        margin: 'auto',
        zIndex: '2'
    },
    ':after': {
        transform: 'rotate(45deg)'
    }
}

export const selectedCreatureStyles = {
    border: 'initial',
    borderStyle: 'solid',
    borderImageRepeat: 'stretch',
    borderImageSlice: '200',
    borderImageSource: 'url(./assets/frame-border.png)',
    borderImageWidth: '47px'
};