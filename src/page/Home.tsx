import { Row, Col, Typography } from "antd";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

type Menu = {
    key: number;
    title: string;
    detail: string;
    value: string;
};

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
        <div>
            <Row justify="center" gutter={[8, 8]}>
                {Menu?.map((v, i) => (
                    <Col span={4}>
                        <div 
                            style={{ 
                                padding: '0 10px', 
                                borderRadius: '12px', 
                                backgroundColor: '#6eda78', 
                            }}>
                            <Link to={`/${v.value}`}>
                                <Typography.Title level={3}>{v.title}</Typography.Title>
                                <Typography.Title level={5}>{v.detail}</Typography.Title>
                            </Link>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}
export default Home