import React, { useState, useCallback } from 'react';
import { Row, Col } from "antd";
import { useTranslation } from 'react-i18next';
import { Position, ShapseMenu } from "../models/styles";
import { Shapse, Shapse_Menu } from "../mockup/style";

function Home() {
    const { t } = useTranslation();

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
        <div className="style">
            <Row className="col-menu" justify="center" gutter={[8, 8]}>
                {Shapse_Menu?.map((v, i) => (
                    <Col span={4} key={i}>
                        <div className="col" onClick={() => handleSelectMenu(v)}>
                            <div style={v.css}/>
                        </div>
                        <div className="col-menu">
                            <div className='col-text'>{t(v.menu)}</div>
                        </div>
                    </Col>
                ))}
            </Row>
            <Row justify={position.top} gutter={[8, 8]}>
                {data.slice(0, 3).map((item, i) => (
                    <Col span={4} key={i}>
                        <div 
                            className="col-shape"
                            onClick={shuffleData}>
                            <div style={item}/>
                        </div>
                    </Col>
                ))}
            </Row>
            <Row justify={position.bottom} gutter={[8, 8]}>
                {data.slice(3, ).map((item, i) => (
                    <Col span={4} key={i}>
                        <div 
                            className="col-shape"
                            onClick={shuffleData}>
                            <div style={item}/>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
export default Home