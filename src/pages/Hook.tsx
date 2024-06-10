import React, { useState, useMemo, useCallback, useRef, useLayoutEffect } from 'react'

type Props = {}

const UseMemo: React.FC = () => {
  const [number, setNumber] = useState<number>(0);
  const [isRandom, setRandom] = useState<boolean>(false);

  const randomWithoutMemo: number = Math.random(); //ทำงาน(random) ทุกครั้งเมื่อมีการกระทำใดบนเว็บ
  
  //ทำงาน(random) เมื่อค่า depadency เปลี่ยนแปลง, return ค่าออกมา
  const randomNumber: number = useMemo(() => {
    return Math.random();
  }, [isRandom]);

  return (
    <div className="container">
      <div className="countContainer">
        <button onClick={() => setNumber(number - 1)}>down</button>
        <span className="number">{number}</span>
        <button onClick={() => setNumber(number + 1)}>up</button>
      </div>
      <p>without useMemo: {randomWithoutMemo}</p>
      <p>useMemo: {randomNumber}</p>
      <button onClick={() => setRandom(!isRandom)}>random</button>
    </div>
  );
}

const UseCallback: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  const randomWithoutCallback = Math.random(); //ทำงาน(random) ทุกครั้งเมื่อมีการกระทำใดบนเว็บ

  //ทำงาน(random) เมื่อค่า depadency เปลี่ยนแปลง
  const randomFunction = useCallback((num:number) => {
    setRandomNumber(Math.random() * num);
  }, []);

  return (
    <div className="container">
      <div className="countContainer">
        <button onClick={() => setNumber(number - 1)}>down</button>
        <span className="number">{number}</span>
        <button onClick={() => setNumber(number + 1)}>up</button>
      </div>
      <p>without useCallback: {randomWithoutCallback}</p>
      <p>useCallback: {randomNumber}</p>
      <button onClick={() => randomFunction(number)}>random</button>
    </div>
  );
}

const Hook = (props: Props) => {
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(100);
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const handleResize = () => {
      if(boxRef.current){
        setWidth(boxRef.current.clientWidth);
        setHeight(boxRef.current.clientHeight);
      }
    };
 
    handleResize();
 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      ref={boxRef}>
        <p>useLayoutEffect</p>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
      <hr/>
      <UseMemo/>
      <hr/>
      <UseCallback/>
    </div>
  )
};

export default Hook