import { useRef, useEffect, useState, createRef, forwardRef } from "react";

type Props = {}

const RefCase1 = () => {
    const titleRef = useRef<HTMLDivElement>(null);;
  
    useEffect(function () {
        setTimeout(() => {
            if (titleRef.current) { // ตรวจสอบว่า Ref มีค่าหรือไม่
                titleRef.current.textContent = "Updated Text";
            }
        }, 2000);
    }, []);
    
    return <div ref={titleRef}>Original title</div>;
};

const RefCase2 = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null)
    const [value_1, setValue1] = useState("");
    const [value_2, setValue2] = useState("");

    return <div>
        <h3>ดึงค่าจาก Element input: {value_1}</h3>
        <input ref={inputRef} type="text" placeholder="Enter text ..." />
        <button onClick={() => {
            if (inputRef.current) {
                setValue1(inputRef.current.value);
            }
        }}>Value</button>
        <h3>ดึงค่าจาก Element div: {value_2}</h3>
        <div ref={divRef}>Some content</div>
        <button onClick={() => {
            if (divRef.current) {
                divRef.current.innerText = "Hello World!"
                setValue2(divRef.current.innerText);
            }
        }}>Value</button>
    </div>
};

const RefCase3 = () => {

    const [renderIndex, setRenderIndex] = useState<number>(1);
    const refFromUseRef = useRef<number | null>(null);
    const refFromCreateRef = createRef();

    if (!refFromUseRef.current) {
        refFromUseRef.current = renderIndex;
      }
    
    //   if (!refFromCreateRef.current) {
    //     refFromCreateRef.current = renderIndex;
    //   }
    

    return <>
        Current render index: {renderIndex}
        <br />
        First render index remembered within refFromUseRef.current:
        {refFromUseRef.current}
        <br />
        refFromCreateRef.current = Current render index:
        {refFromCreateRef.current}
        <br />
        <button onClick={() => setRenderIndex((prevState) => prevState + 1)}>
        Cause re-render
        </button>
    </>
};

const RefCase4 = () => {
    const ref = useRef<HTMLInputElement>(null);

    const alertText = () => {
      const input = ref.current;
      if (input && input.value) {
        alert(input.value);
        } else if (input){ 
            input.focus();
        }
    };
  
    const InputText = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
      (props, ref) => <input ref={ref} {...props} />
    );
  
    return (
      <>
        <InputText ref={ref} placeholder="Enter text..." />
        <button onClick={alertText}>Focus</button>
      </>
    );
};

const Refs = (props: Props) => {
    return (
        <div>
            <RefCase1/>
            <hr />
            <RefCase2/>
            {/* <hr />
            <RefCase3/> */}
            <hr />
            <RefCase4/>
        </div>
    )
}

export default Refs