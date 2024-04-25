import { Row, Col, Typography } from "antd";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Menu } from "../models/home";

function Home() {

    const { t } = useTranslation();

    const Menu: Menu[] = [
        {
            key: 1,
            title: `${t('test')} 1`,
            detail: t('layout_style'),
            value: 'layout_style',
        },
        {
            key: 2,
            title: `${t('test')} 2`,
            detail: t('form_table'),
            value: 'form_table',
        }
    ];

    return (
        <Row justify="center" gutter={[8, 8]}>
            {Menu?.map((v, i) => (
                <Col span={4} key={i}>
                    <div className="menu-item">
                        <a href={`/${v.value}`}>
                            <Typography.Title level={3}>{v.title}</Typography.Title>
                            <Typography.Title level={5}>{v.detail}</Typography.Title>
                        </a>
                    </div>
                </Col>
            ))}
        </Row>
    )
}
export default Home