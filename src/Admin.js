import { Layout, Menu } from 'antd';
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import React, { useMemo, useState } from 'react';
import SearchUser from './components/SearchUser';
import UserTable from './components/UserTable';
import SearchQuestion from './components/SearchQuestion';
import QuestionTable from './components/QuestionTable';

const { Header, Footer, Sider, Content } = Layout;

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState('1');

  // 静态数据：用户与题目，便于演示分页/增删改
  const [users, setUsers] = useState([
    { id: 1, date: '2025-01-05', userName: '陈思远', password: 'chen2025' },
    { id: 2, date: '2025-01-08', userName: '林晓峰', password: 'lin888' },
    { id: 3, date: '2025-01-12', userName: '张雨桐', password: 'zyt123' },
    { id: 4, date: '2025-01-15', userName: '王浩然', password: 'whr666' },
    { id: 5, date: '2025-01-18', userName: '刘梦琪', password: 'lmq999' },
    { id: 6, date: '2025-01-22', userName: '赵天宇', password: 'zty2025' },
    { id: 7, date: '2025-01-25', userName: '孙雅婷', password: 'syt520' },
    { id: 8, date: '2025-02-01', userName: '周俊杰', password: 'zjj168' },
    { id: 9, date: '2025-02-05', userName: '吴佳琪', password: 'wjq321' },
    { id: 10, date: '2025-02-10', userName: '郑凯文', password: 'zkw777' },
  ]);

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: '在 React 中，以下哪个 Hook 用于管理组件状态？',
      optiona: 'useState',
      optionb: 'useEffect',
      optionc: 'useContext',
      optiond: 'useRef',
      answer: 'A',
    },
    {
      id: 2,
      question: 'Git 中用于查看提交历史的命令是？',
      optiona: 'git status',
      optionb: 'git log',
      optionc: 'git diff',
      optiond: 'git show',
      answer: 'B',
    },
    {
      id: 3,
      question: '以下哪个不是 JavaScript 的数据类型？',
      optiona: 'undefined',
      optionb: 'null',
      optionc: 'float',
      optiond: 'symbol',
      answer: 'C',
    },
    {
      id: 4,
      question: 'TCP/IP 协议中，HTTP 协议工作在哪一层？',
      optiona: '网络层',
      optionb: '传输层',
      optionc: '应用层',
      optiond: '数据链路层',
      answer: 'C',
    },
    {
      id: 5,
      question: 'SQL 中用于删除表中所有数据但保留表结构的命令是？',
      optiona: 'DELETE',
      optionb: 'DROP',
      optionc: 'TRUNCATE',
      optiond: 'REMOVE',
      answer: 'C',
    },
    {
      id: 6,
      question: '在 CSS Flexbox 布局中，用于设置主轴方向的属性是？',
      optiona: 'justify-content',
      optionb: 'align-items',
      optionc: 'flex-direction',
      optiond: 'flex-wrap',
      answer: 'C',
    },
    {
      id: 7,
      question: 'Node.js 中用于读取文件的核心模块是？',
      optiona: 'http',
      optionb: 'fs',
      optionc: 'path',
      optiond: 'url',
      answer: 'B',
    },
    {
      id: 8,
      question: '以下哪种设计模式用于确保一个类只有一个实例？',
      optiona: '工厂模式',
      optionb: '观察者模式',
      optionc: '单例模式',
      optiond: '装饰器模式',
      answer: 'C',
    },
    {
      id: 9,
      question: 'RESTful API 中，用于更新资源的 HTTP 方法通常是？',
      optiona: 'GET',
      optionb: 'POST',
      optionc: 'PUT',
      optiond: 'DELETE',
      answer: 'C',
    },
    {
      id: 10,
      question: 'Docker 中用于构建镜像的命令是？',
      optiona: 'docker run',
      optionb: 'docker build',
      optionc: 'docker pull',
      optiond: 'docker create',
      answer: 'B',
    },
  ]);

  const [userKeyword, setUserKeyword] = useState('');
  const [questionKeyword, setQuestionKeyword] = useState('');

  const filteredUsers = useMemo(() => {
    const kw = userKeyword.trim().toLowerCase();
    if (!kw) return users;
    return users.filter(
      (u) =>
        u.userName.toLowerCase().includes(kw) ||
        (u.date && u.date.toLowerCase().includes(kw))
    );
  }, [users, userKeyword]);

  const filteredQuestions = useMemo(() => {
    const kw = questionKeyword.trim().toLowerCase();
    if (!kw) return questions;
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(kw) ||
        [q.optiona, q.optionb, q.optionc, q.optiond]
          .filter(Boolean)
          .some((opt) => opt.toLowerCase().includes(kw))
    );
  }, [questions, questionKeyword]);

  const addUser = (payload) => {
    const nextId = Math.max(0, ...users.map((u) => u.id)) + 1;
    setUsers([...users, { id: nextId, ...payload }]);
  };

  const updateUser = (id, payload) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...payload } : u)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const addQuestion = (payload) => {
    const nextId = Math.max(0, ...questions.map((q) => q.id)) + 1;
    setQuestions([...questions, { id: nextId, ...payload }]);
  };

  const updateQuestion = (id, payload) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...payload } : q)));
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <Layout>
      <Header>
        <h1 style={{ color: '#ffffff' }}>Quiz后台管理</h1>
      </Header>
      <Layout>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            onClick={({ key }) => setSelectedKey(key)}
            items={[
              { key: '1', icon: <UserOutlined />, label: '用户管理' },
              { key: '2', icon: <VideoCameraOutlined />, label: '题目管理' },
            ]}
          />
        </Sider>
        <Content style={{ padding: 16 }}>
          {selectedKey === '1' && (
            <>
              <SearchUser
                onSearch={(kw) => setUserKeyword(kw || '')}
                onAdded={(user) => addUser(user)}
              />
              <UserTable
                data={filteredUsers}
                onDelete={deleteUser}
                onUpdate={updateUser}
              />
            </>
          )}
          {selectedKey === '2' && (
            <>
              <SearchQuestion
                onSearch={(kw) => setQuestionKeyword(kw || '')}
                onAdded={(q) => addQuestion(q)}
              />
              <QuestionTable
                data={filteredQuestions}
                onDelete={deleteQuestion}
                onUpdate={updateQuestion}
              />
            </>
          )}
        </Content>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        Quiz后台管理 ©2025 Created for demo
      </Footer>
    </Layout>
  );
};

export default Admin;
