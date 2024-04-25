import { Row, Col, Typography } from "antd";
import { useTranslation } from 'react-i18next';
import { Menu } from "../models/home";
import { useNavigate } from "react-router-dom";

function Home() {

    const { t } = useTranslation();
    const navigate = useNavigate();

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
                    <div className="menu-item" onClick={() => navigate(`/${v.value}`)}>
                        <Typography.Title level={3}>{v.title}</Typography.Title>
                        <Typography.Title level={5}>{v.detail}</Typography.Title>
                    </div>
                </Col>
            ))}
        </Row>
    )
}
export default Home