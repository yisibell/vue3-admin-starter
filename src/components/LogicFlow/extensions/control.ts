import type { LogicFlow } from '@logicflow/core'

export const registerControl = (LF: LogicFlow) => {
  LF.extension.control.addItem({
    iconClass: 'show-data',
    title: '查看数据',
    text: '数据',
    onClick: (lf: LogicFlow) => {
      const { eventCenter } = lf.graphModel
      eventCenter.emit('custom:show-graphdata', lf)
    }
  })
}
