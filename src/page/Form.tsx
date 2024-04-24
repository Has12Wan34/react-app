import React, { useEffect, useState } from 'react';
import { addUser, removeUser, fetchUser } from '../features/user/userSlice';
import { useTypedSelector, useAppDispatch } from '../store/stateStore';
import { Row, Col, Space, Button, DatePicker, Form, Input, InputNumber, Select, Table, Radio } from 'antd';
import { GetProp, TableProps, TableColumnsType } from 'antd';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';

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
  cardnumber: string;
  salary: number | null;
  gender: string;
  phonenumber: string;
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
  const { t } = useTranslation();
  const users = useTypedSelector((state) => state.users.users);
  const user = useTypedSelector((state) => state.user.user);

  useEffect(() => {
    setForm(user as any);
  },[user]);

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
      sorter: (a, b) => a?.gender.localeCompare(b?.gender),
      sortOrder: tableParams.sorter?.columnKey === 'gender' ? tableParams.sorter?.order : null,
    }, 
    {
      title: t("phonenumber"),
      dataIndex: 'phonenumber',
      sorter: (a, b) => a?.phonenumber.localeCompare(b?.phonenumber),
    }, 
    {
      title: t("nationality"),
      dataIndex: 'nationality',
      sorter: (a, b) => a?.nationality.localeCompare(b?.nationality),
    }, 
    {
      title: t("action"),
      key: 'action',
      render: (_, record) => (
        <Space size="middle" onClick={() => {
          setForm(record);
          dispatch(fetchUser(record));
        }}>
          <a>{t('Detail')}</a>
        </Space>
      ),
    },
  ];

  return(
    <div>
      <Form variant="filled" style={{ border: 'solid', borderRadius: '12px', padding: '20px 0 0 20px'}}>
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
                  options={options.nationality}
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
              value={form.cardnumber} 
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
              style={{ width: '100%' }} 
              value={form?.salary} 
              onChange={(value) => handleInputForm('salary', value)}/>
          </Form.Item>
        </Row>
        <Space>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSubmit}>
              {t("submit")}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="button" onClick={handleSubmit}>
              {t("clear")}
            </Button>
          </Form.Item>
        </Space>
      </Form>

      <Row style={{ padding: '10px 0' }}>
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