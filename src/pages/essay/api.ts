import { http } from '@/utils'

export default {
  getTypingMachine: () => http.get('/common/soul')
}
