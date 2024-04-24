import { ReactNode, useEffect } from 'react';
import { Layout, Dropdown, Button, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useTranslation } from 'react-i18next';

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
]

const App = (prop : FooProps) => {

  const { t, i18n } = useTranslation();
  const lang = localStorage.getItem('lang');

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