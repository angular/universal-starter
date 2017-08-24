import { NgModule } from '@angular/core';
import { ServerTransferState } from './server-transfer-state';
import { TransferState } from './transfer-state';

@NgModule({
  providers: [
    { provide: TransferState, useClass: ServerTransferState }
  ]
})
export class ServerTransferStateModule {

}
