import { observer } from 'mobx-react'
import { Page } from '../components'
import { MDEditor } from '@/components'
import { useLocation, useNavigate } from 'react-router'
import { Button, Flex, Input, message, Modal, Space, Tooltip } from 'antd'
import { LeftOutlined, LikeOutlined, StopOutlined } from '@ant-design/icons'
import { http } from '@/utils'
import { useState, useEffect } from 'react'

const Content = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [isRecommend, setIsRecommend] = useState(state.isRecommend)
  const [status, setStatus] = useState(state.status)

  useEffect(() => {
    if (!state.id) {
      navigate(-1)
    }
  }, [state])

  const toggleRecommend = async () => {
    await http.put('/articles/recommend', {
      id: state.id,
      isRecommend: +!isRecommend
    })
    setIsRecommend(!isRecommend)
    message.success((!isRecommend ? '设为推荐' : '取消推荐') + '成功')
  }

  const toggleStatus = async () => {
    async function request(r?: string) {
      setStatus(!status)
      await http.put('/articles/status', {
        id: state.id,
        status: +!status,
        reason: r
      })
      message.success((!status ? '启用' : '禁用') + '成功')
    }
    // 禁用
    let reason: string
    if (!!status) {
      Modal.confirm({
        title: '请输入退回原因',
        content: <Input onChange={e => (reason = e.target.value)} />,
        onOk: () => request(reason)
      })
      return
    }
    request()
  }

  return (
    <Page style={{ overflow: 'auto' }}>
      <Flex align="center" justify="space-between">
        <div>
          <Button type="link" onClick={() => navigate(-1)} icon={<LeftOutlined />}>
            返回
          </Button>
          {state.title}
        </div>
        <Space>
          <Tooltip title={status ? '退回' : '启用'}>
            <Button
              icon={<StopOutlined />}
              shape="circle"
              size="large"
              danger={!status}
              onClick={toggleStatus}
            />
          </Tooltip>
          <Tooltip title={!isRecommend ? '设为推荐' : '取消推荐'}>
            <Button
              icon={<LikeOutlined />}
              shape="circle"
              size="large"
              type={isRecommend ? 'primary' : 'default'}
              onClick={toggleRecommend}
            />
          </Tooltip>
        </Space>
      </Flex>
      <MDEditor.Viewer value={state?.content} />
    </Page>
  )
}
export default observer(Content)
