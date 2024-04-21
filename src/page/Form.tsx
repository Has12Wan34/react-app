import React, { useState } from 'react';
import { addUser } from '../features/user/userSlice';
import { useTypedSelector, useAppDispatch } from '../store/stateStore';
import { Button, DatePicker, Form, Input, InputNumber, Select } from 'antd';

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
}

function FormComponent(){

  const dispatch = useAppDispatch();
  const users = useTypedSelector((state) => state.users.users);
  console.log(users)
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
    </div>
  );
}

export default FormComponent;