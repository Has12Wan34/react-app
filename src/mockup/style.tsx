import { ShapseMenu } from "../models/styles";

export const Shapse = [
    { backgroundColor: '#555', height: '50px', width: '50px' },
    { backgroundColor: '#555', height: '50px', width: '50px', borderRadius: '50%' },
    { backgroundColor: '#555', height: '50px', width: '100px', borderRadius: '50%' },
    { 
        height: '0px', 
        width: '125px', 
        borderRight: '25px solid transparent', 
        borderLeft: '25px solid transparent',
        borderBottom: '50px solid #555'
    },
    { 
        backgroundColor: '#555',
        height: '50px', 
        width: '100px', 
    },
    { 
        backgroundColor: '#555',
        height: '50px', 
        width: '100px', 
        transform: 'skew(20deg)'
    }
];

export const Shapse_Menu: ShapseMenu[] = [
    { 
        menu : 'Move_left',
        css : { 
            height: '0px', 
            width: '0px', 
            borderBottom: '25px solid transparent', 
            borderTop: '25px solid transparent',
            borderRight: '50px solid #555'
        }

    },
    { 
        menu : 'Move_top',
        css : { 
            height: '0px', 
            width: '0px', 
            borderRight: '25px solid transparent', 
            borderLeft: '25px solid transparent',
            borderBottom: '50px solid #555'
        }

    },
    { 
        menu : 'Move_bottom',
        css : { 
            height: '0px', 
            width: '0px', 
            borderRight: '25px solid transparent', 
            borderLeft: '25px solid transparent',
            borderTop: '50px solid #555'
        }
    },
    { 
        menu : 'Move_rigth',
        css :  { 
            height: '0px', 
            width: '0px', 
            borderBottom: '25px solid transparent', 
            borderTop: '25px solid transparent',
            borderLeft: '50px solid #555'
        },
    }
];