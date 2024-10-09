import { Space, Table, Avatar, Tooltip, Button, Modal, message } from 'antd'
import styles from './styles.less'
import { config } from '@/config'
import { options } from '@/utils'
import { useNavigate } from 'react-router'

const ArticleTable = ({ data, type }) => {
  const navigate = useNavigate()
  const columns: any = [
    {
      title: '标题',
      dataIndex: 'title',
      // fixed: 'left',
      width: 180
    },
    {
      title: '发布人',
      dataIndex: 'userInfo',
      // fixed: 'left',
      width: 100,
      render: val => {
        return (
          <Space>
            <Avatar src={val?.avatar?.resource()} shape="square">
              <Avatar src={config.defaultAvatar} shape="square" />
            </Avatar>
            <div>{val?.nickname || '-'}</div>
          </Space>
        )
      }
    },
    {
      title: '热度',
      dataIndex: 'viewCount',
      width: 100,
      render: val => val + ' 🔥'
    },
    {
      title: '退回原因',
      dataIndex: 'reason',
      hidden: type !== 'user',
      width: 100,
      render: (val, r) => {
        return !r.status ? (
          <Tooltip title={val} arrow={false}>
            <div>退回原因</div>
          </Tooltip>
        ) : (
          '-'
        )
      }
    },
    {
      title: '作品状态',
      dataIndex: 'accessType',
      width: 100,
      render: (val, r) => {
        return (
          <Tooltip title={type === 'user' ? r.password : '-'} arrow={false}>
            {options.accessType.find(item => item.value === val)?.label}
          </Tooltip>
        )
      }
    }
  ]
  return (
    <Table
      bordered
      rowKey={'id'}
      showHeader={false}
      dataSource={data}
      columns={columns}
      className={styles.table}
      onRow={r => {
        return {
          onClick: () => {
            navigate('/article/' + r.id)
          }
        }
      }}
    />
  )
}

export default ArticleTable
