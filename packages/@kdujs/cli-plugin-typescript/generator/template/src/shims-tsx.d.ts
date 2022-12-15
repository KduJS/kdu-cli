import Kdu, { KNode } from 'kdu'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends KNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Kdu {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
