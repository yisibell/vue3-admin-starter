// 支持缩放的节点
import { RectResize } from '@logicflow/extension'

class ScaleableRectNode extends RectResize.view {}
class ScaleableRectNodeModel extends RectResize.model {}

export default {
  type: 'scaleable-rect',
  model: ScaleableRectNodeModel,
  view: ScaleableRectNode
}
