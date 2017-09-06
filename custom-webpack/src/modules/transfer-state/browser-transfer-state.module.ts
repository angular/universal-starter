import { NgModule } from '@angular/core';
import { TransferState } from './transfer-state';

export function getTransferState(): TransferState {
  const transferState = new TransferState();
  transferState.initialize(window['TRANSFER_STATE'] || {});
  return transferState;
}

@NgModule({
  providers: [
    {
      provide: TransferState,
      useFactory: getTransferState
    }
  ]
})
export class BrowserTransferStateModule {

}
