import React, { Component } from 'react';
import { Row, Col, Typography } from "antd";
import { Menu } from "../models/home";

interface CarProps {
    value: Menu;
    navigate: (router:string) => void;
}

class Car extends Component<CarProps> {
    constructor(props: CarProps) {
        super(props);
    }

    render() {
        return (
            <Col span={4} key={this.props.value.title}>
                <div className="menu-item" onClick={() => this.props.navigate(`/${this.props.value.value}`)}>
                    <Typography.Title level={3}>{this.props.value.title}</Typography.Title>
                    <Typography.Title level={5}>{this.props.value.detail}</Typography.Title>
                </div>
            </Col>
        );
    }
}

export default Car;
