import {APP_ID, Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {TransferState, makeStateKey} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

/**
 * Keep caches (makeStateKey) into it in each `setCache` function call
 * @type {any[]}
 */
const transferStateCache = [];

@Injectable()
export class TransferStateService {
    constructor(private transferState: TransferState,
                @Inject(PLATFORM_ID) private platformId: Object,
                @Inject(APP_ID) private appId: string) {
    }

    /**
     * Set cache only when it's running on server
     * @param {string} key
     * @param data Data to store to cache
     */
    setCache(key: string, data: any) {
        if (!isPlatformBrowser(this.platformId)) {
            transferStateCache[key] = makeStateKey<any>(key);
            this.transferState.set(transferStateCache[key], data);
        }
    }


    /**
     * Returns stored cache only when it's running on browser
     * @param {string} key
     * @returns {any} cachedData
     */
    getCache(key: string) {
        if (isPlatformBrowser(this.platformId)) {
            const cachedData: any = this.transferState['store'][key];
            /**
             * Delete the cache to request the data from network next time which is the
             * user's expected behavior
             */
            delete this.transferState['store'][key];
            return cachedData;
        }
    }
}
