import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Typography } from 'antd';
import CardList from './components/cardList/cardList'

const { Header, Content } = Layout;
const { Title } = Typography;

export default class app extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">Home</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', background: '#fff' }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Title>Welcome To Panel</Title>
            <CardList />
          </div>
        </Content>
      </Layout>
    );
  }
}

