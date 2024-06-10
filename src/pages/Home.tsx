import { Row, Col, Typography } from "antd";
import { useTranslation } from 'react-i18next';
import { Menu } from "../models/home";
import { useNavigate } from "react-router-dom";
import CardHome from "../components/card_home";

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

    const handleNavigateRoute = (router:string) => {
        navigate(router);
    }

    return (
        <Row justify="center" gutter={[8, 8]}>
            {Menu?.map((v, i) => (
                <CardHome value={v} navigate={handleNavigateRoute}/>
            ))}
        </Row>
    )
}
export default Home