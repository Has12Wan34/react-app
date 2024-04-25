import { ReactNode, useEffect } from 'react';
import { Layout, Dropdown, Button, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

type FooProps = {
  children: ReactNode
};

const App = (prop : FooProps) => {

  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');

  const TapMenu = [
    { key: 'home', label: (<a href="/">{t('home')}</a>) },
    { key: 'layout_style', label: (<a href="/layout_style">{t('layout_style')}</a>) },
    { key: 'form_table', label: (<a href="/form_table">{t('form_table')}</a>) }
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

  return (
    <Layout>
      <Layout.Header className="header">
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[window.location.href.split('/')[3] || 'home']}
          items={TapMenu}
          className="menu" 
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