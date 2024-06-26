import { ReactNode, useEffect } from 'react';
import { Layout, Dropdown, Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

type FooProps = {
  children: ReactNode
};

const App = (prop : FooProps) => {

  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');
  const navigate = useNavigate();

  const TapMenu = [
    { key: 'home', label: t('home') },
    { key: 'layout_style', label: t('layout_style') },
    { key: 'form_table', label: t('form_table') },
    { key: 'class_component', label: t('class_component') },
    { key: 'Refs', label: t('refs') },
    { key: 'hooks', label: t('hooks') },
  ];

  const Lang = [
    {  key: 'EN', label: 'EN' },
    {  key: 'TH', label: 'TH' }
  ];

  useEffect(() => {
    if(lang){
      i18n.changeLanguage(lang);
    }
  },[lang]);

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    i18n.changeLanguage(e.key);
    localStorage.setItem('lang', e.key);
  };

  const menuProps = {
    items: Lang,
    onClick: handleMenuClick,
  };

  const handleMenuChange = (event:any) => {
    navigate(`/${event.key}`);
  };

  return (
    <Layout>
      <Layout.Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[window.location.href.split('/')[3] || 'home']}
          items={TapMenu}
          className="menu" 
          onSelect={handleMenuChange} 
        />
        <Dropdown
          menu={menuProps}>
          <Button>
              {i18n.language}
          </Button>
        </Dropdown>
      </Layout.Header>
      <Layout.Content className="content">
          {prop.children}
      </Layout.Content>
    </Layout>
  );
};

export default App;