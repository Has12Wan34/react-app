import React, { useState, useCallback } from 'react';
import { Row, Col } from "antd";
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

type Position = {
    select_menu : string | undefined;
    top : 'center' | 'end' | undefined;
    bottom : 'end' | 'center' | undefined;
};

type ShapseMenu = {
    menu: string;
    css: any;
};

function Home() {
    const { t, i18n } = useTranslation();

    const [position, setPosition] = useState<Position>({
        select_menu: 'Move_top',
        top : 'center',
        bottom : 'end',
    });

    const handleSelectMenu = (value:ShapseMenu) => {
        if(value.menu === 'Move_left'){
            shiftLeft();
        }else if(value.menu === 'Move_rigth'){
            shiftRight();
        }else if(value.menu !== position.select_menu){
            setPosition((s) => ({
                ...s,
                select_menu: value.menu,
                top : position.bottom,
                bottom : position.top,
            }));
        }
    };

    const [data, setData] = useState(Shapse);

    const shuffle = (array: any[]): any[] => {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
      };
      const shiftLeft = useCallback(() => {
        setData(prevData => {
          const shiftedData = [...prevData.slice(1), prevData[0]];
          return shiftedData;
        });
      }, []);
    
      const shiftRight = useCallback(() => {
        setData(prevData => {
          const shiftedData = [prevData[prevData.length - 1], ...prevData.slice(0, prevData.length - 1)];
          return shiftedData;
        });
      }, []);

      const shuffleData = useCallback(() => {
        setData(prevData => shuffle(prevData));
      }, []);
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '300px' }}>
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
                                <div style={{ 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                }}>
                                    <div style={{ 
                                        marginTop: '-7px',
                                        borderRadius: '12px',
                                        padding: '2px 10px', 
                                        backgroundColor: 'red', 
                                }}>{t(v.menu)}</div></div>
                        </Col>
                    ))}
                </Row>
                <Row justify={position.top} gutter={[8, 8]}>
                    {data.slice(0, 3).map((item, index) => (
                        <Col span={4}>
                        <div 
                            style={{ backgroundColor: '#6eda78', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}
                            onClick={shuffleData}>
                            <div style={item}/>
                        </div>
                    </Col>
                    ))}
                </Row>
                <Row justify={position.bottom} gutter={[8, 8]}>
                    {data.slice(3, ).map((item, index) => (
                        <Col span={4}>
                        <div 
                            style={{ backgroundColor: '#6eda78', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'center' }}
                            onClick={shuffleData}>
                            <div style={item}/>
                        </div>
                    </Col>
                    ))}
                </Row>
            </div>
        </div>
    )
}
export default Home