import { Injectable, Optional, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { TransferState } from './transfer-state';
import { PlatformState } from '@angular/platform-server';
import * as serialize from 'serialize-javascript';

@Injectable()
export class ServerTransferState extends TransferState {
    constructor( private state: PlatformState, private rendererFactory: RendererFactory2) {
        super();
    }

  /**
   * Inject the State into the bottom of the <head>
   */
  inject() {
    try {
      const document: any = this.state.getDocument();
      const transferStateString = serialize(this.toJson());
      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const head = document.head;
      if (!head) {
        throw new Error('Please have <head> as the first element in your document');
      }

      const script = renderer.createElement('script');
      renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
      renderer.appendChild(head, script);
    } catch (e) {
      console.error(e);
    }
  }


}
