import React, { Component } from 'react';

interface ContainerState {
    show: boolean;
}

interface GreetingProps {
    name: string;
}

// Class Component ชื่อ Container โดยใช้ extends Component เพื่อสืบทอดคุณสมบัติจาก Component class ใน React ซึ่งให้ Container มีความสามารถและลักษณะของคลาส Component ทั้งหมด
class Container extends Component<{}, ContainerState> {
    // Constructor ที่รับ props, ใช้สำหรับการกำหนดค่าเริ่มต้นใน State หรือการทำงานที่ต้องการให้เกิดขึ้นหนึ่งครั้งเมื่อคอมโพเนนต์ถูกสร้างขึ้นมา
    constructor(props: {}) {
        super(props);
        this.state = { show: true };
    }

    // เมธอดเปลี่ยนเเปลงค่า show และอัปเดต state
    delHeader = () => {
        this.setState({ show: !this.state.show });
    }

    render() {
        let classCom: JSX.Element | null = null;
        let funcCom: JSX.Element | null = null;
        if (this.state.show) {
            classCom = <ClassGreeting name="class" />; // การใช้ Class Component
        }else{
            funcCom = <FunctionalGreeting name='func'/> // การใช้ Functional Component
        }
        return (
            <div>
                {classCom || funcCom}
                <button type="button" onClick={this.delHeader}>Change</button>
            </div>
        );
    }
}

// React Element ที่สร้างจาก JSX
const element_1 = <h1>Hello</h1>;

// React Element ที่สร้างด้วย React.createElement()
const element_2 = React.createElement('h2', null, 'React componnet');

// Functional Component
function FunctionalGreeting(props: GreetingProps) {
    return <div>
        {element_1}
        {element_2}
        <h3>{props.name}</h3>
    </div>;
    }

// Class Component
class ClassGreeting extends React.Component<GreetingProps> {
    render() {
      return <div>
        {element_1}
        {element_2}
        <h3>{this.props.name}</h3>
      </div>;
    }
}

export default Container;
