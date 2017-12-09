import {APP_ID, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {TransferState, makeStateKey, StateKey} from '@angular/platform-browser';

const transferStateCache = [];
import {isPlatformBrowser, Location} from '@angular/common';

/**
 * Helper service to store transfer-state, it means to store the state of the application when app serves by node
 * (server-side rendering) and gives data back to the application on browser-side
 * @author Kermani
 */
@Injectable()
export class TransferStateService {
    constructor(private transferState: TransferState,
                @Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string,) {
    }

    setCache(key: string, data: any) {
        if (!this.isBrowser()) {
            console.log("set ceche, true");
            this.transferState.set(transferStateCache[key], data);
        }
    }

    getCache(key: string) {
        if (this.isTransferStateAllowed(transferStateCache[key])) {
            console.log("GET cache, true");
            const cacheData = this.transferState.get(transferStateCache[key], null as any);
            this.transferState.remove(transferStateCache[key]);
            return cacheData;
        }
    }

    /**
     * This method will check if it's the first request (no route change), and it's browser, and also
     *  the value of the transferState variable is not false or empty, then will fill the app required
     *  variables which app works as expected and will not make repetitive requests to server to
     *  receive the same API endpoint.
     * @param {StateKey<string>} keyToCheck Cache (variable) name to check if already exist
     * @returns {boolean}
     * @author Kermani
     */
    isTransferStateAllowed(keyToCheck: StateKey<string>) {
        if (this.isBrowser() && this.transferState.hasKey(keyToCheck)) {
            return true;
        }
        return false;
    }

    isBrowser() {
        return isPlatformBrowser(this.platformId);
    }
}
