import React, { useState } from 'react';
import { Radio, Row, Col, Divider } from "antd";
import { useTranslation } from 'react-i18next';

const Shapse = [
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

const Shapse_Menu: ShapseMenu[] = [
    { 
        menu : 'move-left',
        set : '',
        css : { 
            height: '0px', 
            width: '0px', 
            borderBottom: '25px solid transparent', 
            borderTop: '25px solid transparent',
            borderRight: '50px solid #555'
        }

    },
    { 
        menu : 'move-top',
        set : '',
        css : { 
            height: '0px', 
            width: '0px', 
            borderRight: '25px solid transparent', 
            borderLeft: '25px solid transparent',
            borderBottom: '50px solid #555'
        }

    },
    { 
        menu : 'move-bottom',
        set : '',
        css : { 
            height: '0px', 
            width: '0px', 
            borderRight: '25px solid transparent', 
            borderLeft: '25px solid transparent',
            borderTop: '50px solid #555'
        }
    },
    { 
        menu : 'move-right',
        set : '',
        css :  { 
            height: '0px', 
            width: '0px', 
            borderBottom: '25px solid transparent', 
            borderTop: '25px solid transparent',
            borderLeft: '50px solid #555'
        },
    }
];

type Position = {
    row_1 : 'center' | 'end' | undefined,
    row_2 : 'end' | 'center' | undefined,
};

type ShapseMenu = {
    menu: string;
    set: string;
    css: any;
};

function Home() {
    const { t, i18n } = useTranslation();

    const [position, setPosition] = useState<Position>({
        row_1 : 'center',
        row_2 : 'end',
    });

    const handleSelectMenu = (value:ShapseMenu) => {
        setPosition((s) => ({
            ...s,
            // row_1 : x,
            row_2 : 'center',
        }))
    };

    const handleSelectLag = (lang:string) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div style={{ padding: '5%'}}>
            <Radio.Group value='small' onChange={(e) => handleSelectLag(e.target.value)}>
                <Radio.Button value="th">Thai</Radio.Button>
                <Radio.Button value="en">Eng</Radio.Button>
            </Radio.Group>
            <div style={{ padding: '2%' }}>
                <Row justify="center" gutter={[8, 8]}>
                    {Shapse_Menu?.map((v, i) => (
                        <Col span={4}>
                            <div 
                                style={{ 
                                    display: 'flex', 
                                    padding: '12px', 
                                    borderRadius: '12px', 
                                    backgroundColor: '#6eda78', 
                                    justifyContent: 'center' ,
                                }} onClick={() => handleSelectMenu(v)}>
                                <div style={v.css}/>
                            </div>
                        </Col>
                    ))}
                </Row>
                <Row justify={position.row_1} gutter={[8, 8]}>
                    {Shapse?.map((v, i) => {
                        if(i < 3)
                        return(
                            <Col span={4}>
                                <div style={{ backgroundColor: '#6eda78', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                                    <div style={v}/>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
                <Row justify={position.row_2} gutter={[8, 8]}>
                    {Shapse?.map((v, i) => {
                        if(i > 2)
                        return(
                            <Col span={4}>
                                <div style={{ backgroundColor: '#6eda78', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}>
                                    <div style={v}/>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        </div>
    )
}
export default Home