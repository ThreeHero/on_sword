import { Space, Table, Avatar, Tooltip, Button, Modal, message, Popconfirm } from 'antd'
import styles from './styles.less'
import { config } from '@/config'
import { http, options } from '@/utils'
import { useNavigate } from 'react-router'

const ArticleTable = ({ data, type, search, changePage, page, pageSize, total, userId }) => {
  const navigate = useNavigate()
  const columns: any = [
    {
      title: '标题',
      dataIndex: 'title',
      // fixed: 'left',
      width: 180,
      render: (v, r) => {
        return (
          <div
            className={styles.title}
            onClick={() => {
              navigate('/article/' + r.id)
            }}
          >
            {v}
          </div>
        )
      }
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
    },
    {
      title: '操作',
      hidden: type !== 'user',
      width: 100,
      render: (val, r) => {
        return (
          <Popconfirm
            title="确定删除？"
            onConfirm={async () => {
              await http.delete('/articles/' + r.id)
              changePage(1, 10)
              search({ type, publisherId: userId })
              message.success('删除成功')
            }}
          >
            <Button
              type="link"
              danger
              onClick={e => {
                e.stopPropagation()
              }}
            >
              删除
            </Button>
          </Popconfirm>
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
      pagination={{
        current: page,
        pageSize: pageSize,
        total: total,
        // showSizeChanger: true,
        showTotal: total => `共 ${total} 条`,
        onChange: (page, pageSize) => {
          changePage(page, pageSize)
          search({ type, publisherId: userId })
        }
      }}
    />
  )
}

export default ArticleTable
