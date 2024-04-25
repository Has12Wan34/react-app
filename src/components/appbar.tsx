import { ReactNode, useEffect } from 'react';
import { Layout, Dropdown, Button, Space, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { redirect } from "react-router-dom";

type FooProps = {
  children: ReactNode
};

const App = (prop : FooProps) => {

  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');

  const TapMenu = [
    { key: 'home', label: t('home') },
    { key: 'layout_style', label: t('layout_style') },
    { key: 'form_table', label: t('form_table') }
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

  const onClick: MenuProps['onClick'] = (e) => {
    redirect(`/${e.key}`);
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
          onClick={onClick}
        />
      <Dropdown
        menu={menuProps}>
        <Button>
          <Space>
            {i18n.language}
          </Space>
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