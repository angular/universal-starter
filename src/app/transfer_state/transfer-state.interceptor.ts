import {Injectable} from '@angular/core';
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import {TransferStateService} from './transfer-state.service';

@Injectable()
export class TransferStateInterceptor implements HttpInterceptor {
    constructor(private transferStateService: TransferStateService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('INTERCEPTOR:');
        /**
         * Before doing anything, it's important to only cache GET requests.
         * Skip this interceptor if the request method isn't GET.
         */
        if (req.method !== 'GET') {
            return next.handle(req);
        }

        const cachedResponse = this.transferStateService.getCache(req.url);
        if (cachedResponse) {
            console.log('cache found');
            // A cached response exists. Serve it instead of forwarding
            // the request to the next handler.
            return Observable.of(new HttpResponse<any>({body: cachedResponse}));
        }

        /**
         * No cached response exists. Go to the network, and cache
         * the response when it arrives.
         */
        return next.handle(req).do(event => {
            if (event instanceof HttpResponse) {
                // Set cache
                console.log('No cache found, set cache now')
                this.transferStateService.setCache(req.url, event.body);
            }
        });
    }
}
