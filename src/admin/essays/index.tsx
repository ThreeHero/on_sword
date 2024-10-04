import { Page, ProTable } from '../components'
import { parseContent } from '@/utils'
import { Tooltip, Typography } from 'antd'
function Index() {
  const columns = [
    {
      title: '发布人',
      name: 'publisher',
      width: 140,
      render(v) {
        return v?.nickname
      }
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: 140,
      search: {},
      render: v => {
        // TODO 图片列表显示
        const [content, imgList] = parseContent(v)

        return (
          <Tooltip title={content}>
            <Typography.Text ellipsis>{content}</Typography.Text>
          </Tooltip>
        )
      }
      // TODO 解析
    },
    {
      title: '地区',
      name: 'region',
      width: 140
    },
    {
      title: '创建时间',
      name: 'createdAt',
      width: 140
    },
    {
      title: '最后修改时间',
      name: 'updatedAt',
      width: 140
    }
  ]
  return (
    <Page>
      <ProTable
        api="essays"
        columns={columns}
        actions={false}
        contextMenus={[{ label: '删除', key: 'DELETE', danger: true }]}
      />
    </Page>
  )
}

export default Index
