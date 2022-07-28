import Kdu, { KNode } from 'kdu'

declare global {
  namespace JSX {
    interface Element extends KNode {}
    interface ElementClass extends Kdu {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
