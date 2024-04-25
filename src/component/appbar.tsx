import { ReactNode, useEffect } from 'react';
import { Layout, Dropdown, Button, Space, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { redirect } from "react-router-dom";

const { Header, Content } = Layout;

type FooProps = {
  children: ReactNode
}

const Lang = [
  { 
    key: 'EN',
    label: 'EN',
  },
  { 
    key: 'TH',
    label: 'TH',
  }
];

const App = (prop : FooProps) => {

  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');

  const TapMenu = [
    {
      key: 'home',
      label: t('home'),
    },
    {
      key: 'layout_style',
      label: t('layout_style'),
    },
    {
      key: 'form_table',
      label: t('form_table'),
    }
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
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[window.location.href.split('/')[3] || 'home']}
          items={TapMenu}
          style={{ flex: 1, minWidth: 0 }}
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
      </Header>
      <Content style={{
        padding: '3%',
        minHeight: 500,
        background: 'linear-gradient(to right, #6eda78, #ffa200)',
      }}>
          {prop.children}
      </Content>
    </Layout>
  );
};

export default App;