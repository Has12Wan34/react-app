import React, { useEffect, useState } from 'react';
import { addUser, removeUser, fetchUserById } from '../features/user/userSlice';
import { useTypedSelector, useAppDispatch } from '../store/stateStore';
import { Space, Button, DatePicker, Form, Input, InputNumber, Select, Table, Radio } from 'antd';
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
  key: string;
  prefix: string;
  fname: string;
  lname: string;
  passport: string | undefined;
  cardnumbe: string;
  salary: number | null;
  gender: string;
  phonenumber: string | undefined;
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
    key: '',
    prefix: '',
    fname: '',
    lname: '',
    birthdate: '',
    nationality: '',
    cardnumbe: '',
    passport: '',
    phonenumber: '',
    salary: null,
    gender: '',
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
      pageSize: 10,
    }
  });

  const [record, setRecord] = useState<React.Key[]>([]);

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
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'fname',
      key: 'fname',
      render: (_, record) => <p>{record?.fname} {record?.lname}</p>,
      sorter: (a, b) => a?.fname.localeCompare(b?.fname),
      sortOrder: tableParams.sorter?.columnKey === 'fname' ? tableParams.sorter?.order : null,
    },
    {
     title: 'เพศ',
      dataIndex: 'gender',
    }, 
    {
      title: 'หมายเลขเบอร์โทร',
       dataIndex: 'phonenumber',
    }, 
    {
      title: 'สัญชาติ',
       dataIndex: 'nationality',
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
    <div style={{ padding: '5%', backgroundImage: 'linear-gradient(to right, #6eda78, #ffa200)'}}>
      <Form {...formItemLayout} variant="filled" style={{ paddingTop: '1%', border: 'solid'}}>
        <Form.Item 
          label="คำนำหน้า" 
          name="prefix" 
          rules={[{ required: true, message: 'โปรดระบุคำนำหน้า' }]}>
          <Select 
            placeholder="โปรดระบุคำนำหน้า"
            options={options.prefix}
            value={form?.prefix}
            onChange={(value) => handleInputForm('prefix', value)}/>
        </Form.Item>

        <Form.Item 
          label="ชื่อจริง" 
          name="fname" 
          rules={[{ required: true, message: 'โปรดระบุชื่อจจริง' }]}>
          <Input 
            name="fname" 
            value={form?.fname} 
            placeholder="โปรดระบุชื่อจริง" 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item 
          label="นามสกุล"
          name="lname"  
          rules={[{ required: true, message: 'โปรดระบุนามสกุล' }]}>
          <Input 
            name="lname" 
            value={form?.lname} 
            placeholder="โปรดระบุนามสกุล" 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="วันเกิด"
          name="birthdate"
          rules={[{ required: true, message: 'Please input!' }]}
        >
          <DatePicker 
            format={{
              format: 'YYYY-MM-DD',
            }}
            onChange={(date, dateString) => handleInputForm('birthdate', dateString)}/>
        </Form.Item>

        <Form.Item 
          label="สัญชาติ" 
          name="nationality" 
          rules={[{ required: true, message: 'โปรดระบุสัญชาติ' }]}>
            <Select 
              placeholder="โปรดระบุสัญชาติ"
              options={options.nationality}
              value={form?.nationality}
              onChange={(value) => handleInputForm('nationality', value)}/>
        </Form.Item>

        <Form.Item 
          label="เลขบัตรประชาชน" 
          name="cardnumbe" 
          rules={[{ required: true, message: 'โปรดระบุเลขบัตรประชาชน' }]}>
          <Input.OTP 
            length={13} 
            value={form?.cardnumbe} 
            onChange={(value) => handleInputForm('cardnumbe', value)}/>
        </Form.Item>

        <Form.Item 
          label="ระบุเพศ"
          name="gender" 
          rules={[{ required: true, message: 'โปรดระบุเพศ' }]}>
          <Radio.Group
            value={form?.gender}
            onChange={(e) => handleInputForm('gender', e.target.value)}>
            <Radio value="man">ผู้ชาย</Radio>
            <Radio value="woman">ผู้หญิง</Radio>
            <Radio value="-">ไม่ระบุ</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item 
          label="หมายเลขโทรศัพท์" 
          name="phonenumber" 
          rules={[{ required: true, message: 'โปรดระบุหมายเลขโทรศัพท์' }]}>
          <Input.OTP 
            length={10} 
            value={form?.phonenumber} 
            onChange={(value) => handleInputForm('phonenumber', value)} />
        </Form.Item>

        <Form.Item
          label="หนังสือเดินทาง"
          rules={[{ required: true, message: 'โปรดระบุหนังสือเดินทาง' }]}
          >
          <Input.TextArea 
            name="passport"
            placeholder="โปรดระบุหนังสือเดินทาง" 
            value={form?.passport} 
            onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
        </Form.Item>

        <Form.Item
          label="เงินเดือนที่คาดหวัง"
          name="salary"
          rules={[{ required: true, message: 'โปรดระบุเงินเดือนที่คาดหวัง' }]}
        >
          <InputNumber 
            placeholder="โปรดระบุเงินเดือนที่คาดหวัง" 
            style={{ width: '100%' }} 
            value={form?.salary} 
            onChange={(value) => handleInputForm('salary', value)}/>
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
        rowKey={(record) => record?.key}
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