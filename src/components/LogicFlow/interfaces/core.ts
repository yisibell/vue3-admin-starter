export interface NodeEventData {
  data: {
    id: string
    properties: Record<string | number, any>
    type: string
    x: number
    y: number
  }
  e: PointerEvent
  isMultiple: boolean
  isSelected: boolean
  position: {
    canvasOverlayPosition: {
      x: number
      y: number
      domOverlayPosition: {
        x: number
        y: number
      }
    }
  }
}
