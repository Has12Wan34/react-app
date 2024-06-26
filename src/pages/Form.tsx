import React, { useEffect, useState } from 'react';
import { addUser, removeUser, fetchUser, editUser } from '../features/user/userSlice';
import { useTypedSelector, useAppDispatch } from '../store/stateStore';
import { Row, Col, Space, Button, DatePicker, Form, Input, InputNumber, Select, Table, Radio, Spin } from 'antd';
import type { GetProp, TableProps, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import { Users } from '../models/form';
import dayjs from 'dayjs';

type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sorter?: any;
}

function FormComponent(){

  const { t } = useTranslation(); 
  const dispatch = useAppDispatch(); // เรียกใช้ hook เพื่อ dispatch actions
  const { users, user, status } = useTypedSelector((state) => state.user); // เรียกใช้ hook เพื่อเข้าถึง state จาก store
  
  const [record, setRecord] = useState<React.Key[]>([]);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    }
  });

  const [form, setForm] = useState<Users>({
    key: '',
    prefix: '',
    fname: '',
    lname: '',
    birthdate: '',
    nationality: '',
    cardnumber: '',
    passport: '',
    phonenumber: '',
    salary: null,
    gender: '',
  });

  const options = {
    prefix : [
      { value: 'mr', label: t('mr') },
      { value: 'mrs', label: t('mrs') },
      { value: 'ms', label: t('ms') },
    ],
    nationality : [
      { value: 'thai', label: t('thai') },
    ],
  };

  useEffect(() => {
    setForm(user as any);
  },[user]);

  const handleInputForm = (key:string, value: string | null | string[] | number) => {
    setForm((s) => ({
      ...s,
      [key] : value
    }))
  };

  const handleSubmit = () => {
    dispatch(addUser(form));
    setForm({
      key: '',
      prefix: '',
      fname: '',
      lname: '',
      birthdate: '',
      nationality: '',
      cardnumber: '',
      passport: '',
      phonenumber: '',
      salary: null,
      gender: '',
    })
  };

  const handleSave = () => {
    dispatch(editUser(form));
  };

  const handleClear = () => {
    localStorage.removeItem('user');
    setForm({
      key: '',
      prefix: '',
      fname: '',
      lname: '',
      birthdate: '',
      nationality: '',
      cardnumber: '',
      passport: '',
      phonenumber: '',
      salary: null,
      gender: '',
    })
  };

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
    if(record?.length === users?.length){
      handleClear();
      localStorage.removeItem('users');
      localStorage.removeItem('user');
    }
    dispatch(removeUser(record));
    setRecord([]);
  };

  const columns: TableColumnsType<Users> = [
    {
      title: t("fname_lname"),
      dataIndex: 'fname',
      key: 'fname',
      render: (_, record) => <p>{record?.fname} {record?.lname}</p>,
      sorter: (a, b) => a?.fname.localeCompare(b?.fname),
      sortOrder: tableParams.sorter?.columnKey === 'fname' ? tableParams.sorter?.order : null,
    },
    {
      title: t("gender"),
      dataIndex: 'gender',
      key: 'gender',
      render: (_, record) => (<p>{t(record.gender)}</p>),
      sorter: (a, b) => a?.gender.localeCompare(b?.gender),
      sortOrder: tableParams.sorter?.columnKey === 'gender' ? tableParams.sorter?.order : null,
    }, 
    {
      title: t("phonenumber"),
      dataIndex: 'phonenumber',
      key: 'phonenumber',
      sorter: (a, b) => a?.phonenumber.localeCompare(b?.phonenumber),
      sortOrder: tableParams.sorter?.columnKey === 'phonenumber' ? tableParams.sorter?.order : null,
    }, 
    {
      title: t("nationality"),
      dataIndex: 'nationality',
      key: 'nationality',
      sorter: (a, b) => a?.nationality.localeCompare(b?.nationality),
      render: (_, record) => (<p>{t(record.nationality)}</p>),
      sortOrder: tableParams.sorter?.columnKey === 'nationality' ? tableParams.sorter?.order : null,
    }, 
    {
      title: t("action"),
      key: 'action',
      render: (_, record) => (
        <Space size="middle" onClick={() => {
          dispatch(fetchUser(record.key));
        }}>
          <a>{t('Detail')}</a>
        </Space>
      ),
    },
  ];

  return(
    <div>
      <Spin spinning={status === 'loading'} size="large" delay={500}>
        <Form variant="filled" className="form-component">
          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item 
                label={t("prefix")} 
                rules={[{ required: true, message: t("err_prefix") }]}>
                <Select 
                  placeholder={t("detail_prefix")} 
                  options={options.prefix}
                  value={form?.prefix}
                  onChange={(value) => handleInputForm('prefix', value)}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item 
                label={t("fname")} 
                rules={[{ required: true, message: t("err_fname") }]}>
                <Input 
                  name="fname" 
                  value={form?.fname} 
                  placeholder={t("detail_fname")} 
                  onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item 
                label={t("lname")}
                rules={[{ required: true, message: t("err_lname") }]}>
                <Input 
                  name="lname" 
                  value={form?.lname} 
                  placeholder={t("detail_lname")} 
                  onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[8, 8]}>
            <Col>
              <Form.Item
                label={t("birthdate")}
                rules={[{ required: true, message: t("err_birthdate") }]}
              >
                <DatePicker 
                  value={form?.birthdate ? dayjs(form.birthdate) : null}
                  format={{
                    format: 'YYYY-MM-DD',
                  }}
                  placeholder={t("detail_birthdate")} 
                  onChange={(date, dateString) => handleInputForm('birthdate', dateString)}/>
              </Form.Item>
            </Col>
            <Col>
              <Form.Item 
                label={t("nationality")} 
                rules={[{ required: true, message: t("err_nationality") }]}>
                  <Select 
                    placeholder={t("detail_nationality")} 
                    options={options?.nationality}
                    value={form?.nationality}
                    onChange={(value) => handleInputForm('nationality', value)}/>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item 
              label={t("cardnumber")} 
              rules={[{ required: true, message: t("err_cardnumber") }]}>
              <Input.OTP 
                length={13} 
                value={form?.cardnumber} 
                onChange={(value) => handleInputForm('cardnumber', value)}/>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item 
              label={t("gender")} 
              rules={[{ required: true, message: t("err_gender") }]}>
              <Radio.Group
                value={form?.gender}
                onChange={(e) => handleInputForm('gender', e.target.value)}>
                <Radio value="man">{t("man")}</Radio>
                <Radio value="woman">{t("woman")}</Radio>
                <Radio value="-">{t("other")}</Radio>
              </Radio.Group>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item 
              label={t("phonenumber")}
              rules={[{ required: true, message: t("err_phonenumber") }]}>
              <Input.OTP 
                length={10}
                value={form?.phonenumber} 
                onChange={(value) => handleInputForm('phonenumber', value)} />
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("passport")}
              rules={[{ required: true, message: t("err_passport") }]}
              >
              <Input.TextArea 
                name="passport"
                placeholder={t("detail_passport")} 
                value={form?.passport} 
                onChange={(e) => handleInputForm(e.target.name, e.target.value)}/>
            </Form.Item>
          </Row>

          <Row>
            <Form.Item
              label={t("salary")}
              rules={[{ required: true, message: t("err_salary") }]}
            >
              <InputNumber
                placeholder={t("detail_salary")} 
                value={form?.salary} 
                onChange={(value) => handleInputForm('salary', value)}/>
            </Form.Item>
          </Row>

          <Space>
            {(form?.key && user?.key) ?
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleSave}>
                  {t("save")}
                </Button>
              </Form.Item>
            :
              <Form.Item>
                <Button type="primary" htmlType="button" onClick={handleSubmit}>
                  {t("submit")}
                </Button>
              </Form.Item>
            }
            <Form.Item>
              <Button type="primary" htmlType="button" onClick={handleClear}>
                {t("clear")}
              </Button>
            </Form.Item>
          </Space>

        </Form>
      </Spin>

      <Row className="row-component">
        {record?.length > 0 &&
          <Button type="primary" htmlType="button" onClick={saveRemoveUser}>{t('delete')}</Button>
        }
      </Row>

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