import React, { useEffect, useState } from 'react';
import { addUser, removeUser, fetchUserById } from '../features/user/userSlice';
import { useTypedSelector, useAppDispatch } from '../store/stateStore';
import { Space, Button, DatePicker, Form, Input, InputNumber, Select, Table } from 'antd';
import { GetProp, TableProps, TableColumnsType } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const options = {
  prefix : [
    { value: 'นาย', label: 'นาย' },
    { value: 'นส.', label: 'นส.' },
  ],
  nationality : [
    { value: 'ไทย', label: 'ไทย' },
    { value: 'มาเลย์', label: 'มาเลย์' },
  ],
};

interface Users {
  prefix: string;
  fname: string;
  lname: string;
  passport: string;
  amount: number | null;
  gender: string;
  nationality: string;
  birthdate: string;
};

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sorter?: any;
}

function FormComponent(){

  const dispatch = useAppDispatch();
  const users = useTypedSelector((state) => state.users.users);
  const user = useTypedSelector((state) => state.user.user);

  useEffect(() => {
    setForm(user as any)
  },[user])

  const [form, setForm] = useState<Users>({
    prefix: '',
    fname: '',
    lname: '',
    passport: '',
    amount: null,
    gender: '',
    nationality: '',
    birthdate: ''
  });

  const handleInputForm = (key:string, value: string | null | string[] | number) => {
    setForm((s) => ({
      ...s,
      [key] : value
    }))
  };

  const handleSubmit = () => {
    dispatch(addUser(form));
  };

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 2,
    }
  });

  const [record, setRecord] = useState<React.Key[]>([]);

  console.log(tableParams.sorter?.columnKey)
  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
      setTableParams(() => ({
        pagination,
        sorter
      }));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setRecord(newSelectedRowKeys)
  };

  const saveRemoveUser = () => {
    dispatch(removeUser(record));
  };

  const columns: TableColumnsType<Users> = [
    {
      title: 'FirstName',
      dataIndex: 'fname',
      key: 'fname',
      sorter: (a, b) => a.fname.localeCompare(b.fname),
      sortOrder: tableParams.sorter?.columnKey === 'fname' ? tableParams.sorter?.order : null,
    },
    {
      title: 'LastName',
      dataIndex: 'lname',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle" onClick={() => dispatch(fetchUserById(record))}>
          <a>Detail</a>
        </Space>
      ),
    },
  ];

  return(
    <div style={{ padding: '5%'}}>
      <Form {...formItemLayout} variant="filled" style={{ paddingTop: '1%', border: 'solid'}}>
        <Form.Item 
          label="คำนำหน้า" 
          name="prefix" 
          rules={[{ required: true, message: 'โปรดระบุคำนำหน้า' }]}>
          <Select 
            placeholder="โปรดระบุคำนำหน้า"
            options={options.prefix}
            value={form.prefix}
            onChange={(value) => handleInputForm('prefix', value)}/>
        </Form.Item>

        <Form.Item 
          label="ชื่อจริง" 
          rules={[{ required: true, message: 'โปรดระบุชื่อจจริง' }]}>
          <Input 
            name="fname" 
            value={form.fname} 
            placeholder="โปรดระบุชื่อจริง" 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item 
          label="นามสกุล" 
          rules={[{ required: true, message: 'โปรดระบุนามสกุล' }]}>
          <Input 
            name="lname" 
            value={form.lname} 
            placeholder="โปรดระบุนามสกุล" 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="เงินเดือนที่คาดหวัง"
          name="amount"
          rules={[{ required: true, message: 'โปรดระบุเงินเดือนที่คาดหวัง' }]}
        >
          <InputNumber 
            placeholder="โปรดระบุเงินเดือนที่คาดหวัง" 
            style={{ width: '100%' }} 
            value={form.amount} 
            onChange={(value) => handleInputForm('amount', value)}/>
        </Form.Item>

        <Form.Item
          label="หนังสือเดินทาง"
          rules={[{ required: true, message: 'Please input!' }]}
          >
          <Input.TextArea 
            name="passport"
            placeholder="โปรดระบุหนังสือเดินทาง" 
            value={form.passport} 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item 
          label="สัญชาติ" 
          name="nationality" 
          rules={[{ required: true, message: 'โปรดระบุสัญชาติ' }]}>
            <Select 
              placeholder="โปรดระบุสัญชาติ"
              options={options.nationality}
              value={form.nationality}
              onChange={(value) => handleInputForm('nationality', value)}/>
        </Form.Item>

        <Form.Item
          label="DatePicker"
          name="DatePicker"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker 
            format={{
              format: 'YYYY-MM-DD',
            }}
            onChange={(date, dateString) => handleInputForm('birthdate', dateString)}/>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
          <Button type="primary" htmlType="button" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" htmlType="button" onClick={saveRemoveUser}>DELETE</Button>
      <Table 
        columns={columns} 
        dataSource={users} 
        rowKey={(record) => record.fname}
        rowSelection={{
          onChange: onSelectChange,
        }} 
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default FormComponent;