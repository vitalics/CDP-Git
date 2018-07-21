import 'reflect-metadata';
import { PageDecoratorOptions } from 'types/decorators';

/**
 * make class PageLike with defined url property
 * @param pageOpts must contain page url description
 * @example
 * ```
 * ``` typescript
 *
 * const somePage = new SomePage();
 * somePage.open() // opened with https://example.com/somePathfromBaseUrl
 *
 * @page({url: '/somePathfromBaseUrl', baseUrl: 'https://example.com'}) // rewriting base url setting
 * class SomePage extends Page {
 * }
 * ```
 */
export function page(pageOpts: PageDecoratorOptions): ClassDecorator {
    return (target: object) => {

        if (pageOpts.baseUrl) {
            pageOpts.url = pageOpts.baseUrl + pageOpts.url;
        }
        if (pageOpts.baseUrl && pageOpts.path) {
            pageOpts.url = pageOpts.baseUrl + pageOpts.url;
        }
        if (!pageOpts.baseUrl) {
            const proto: Record<string, any> = Reflect.getPrototypeOf(target);
            const protoUrl: Record<string, any> = Reflect.getMetadata(`page_${proto}`, proto);
            if (protoUrl && protoUrl.url) {
                pageOpts.path = pageOpts.url;
                pageOpts.url = protoUrl.url + pageOpts.url;
                pageOpts.baseUrl = protoUrl.url;
            }
        }

        Reflect.defineMetadata(`page_${target}`, pageOpts, target);
    };
}
