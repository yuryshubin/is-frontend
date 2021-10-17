/// <reference path="./custom.d.ts" />
// tslint:disable
/**
 * IntelliStyle Api
 * IntelliStyle Api
 *
 * OpenAPI spec version: 1.0.0
 * Contact: crusher83@gmail.com
 *
 * NOTE: This file is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the file manually.
 */

import * as url from "url";
import * as isomorphicFetch from "isomorphic-fetch";
import { Configuration } from "./configuration";

const BASE_PATH = "/".replace(/\/+$/, "");

/**
 *
 * @export
 */
export const COLLECTION_FORMATS = {
    csv: ",",
    ssv: " ",
    tsv: "\t",
    pipes: "|",
};

/**
 *
 * @export
 * @interface FetchAPI
 */
export interface FetchAPI {
    (url: string, init?: any): Promise<Response>;
}

/**
 *
 * @export
 * @interface FetchArgs
 */
export interface FetchArgs {
    url: string;
    options: any;
}

/**
 *
 * @export
 * @class BaseAPI
 */
export class BaseAPI {
    protected configuration?: Configuration;

    constructor(configuration?: Configuration, protected basePath: string = BASE_PATH, protected fetch: FetchAPI = isomorphicFetch) {
        if (configuration) {
            this.configuration = configuration;
            this.basePath = configuration.basePath || this.basePath;
        }
    }
};

/**
 *
 * @export
 * @class RequiredError
 * @extends {Error}
 */
export class RequiredError extends Error {
    name = "RequiredError"
    constructor(public field: string, msg?: string) {
        super(msg);
    }
}

/**
 *
 * @export
 * @interface GarmentItem
 */
export interface GarmentItem {
    /**
     *
     * @type {number}
     * @memberof GarmentItem
     */
    id: number;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    url: string;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    gender: string;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    description: string;
    /**
     *
     * @type {Array<string>}
     * @memberof GarmentItem
     */
    image_urls: Array<string>;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    title: string;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    brand: string;
    /**
     *
     * @type {number}
     * @memberof GarmentItem
     */
    price: number;
    /**
     *
     * @type {string}
     * @memberof GarmentItem
     */
    currency: string;
    /**
     *
     * @type {number}
     * @memberof GarmentItem
     */
    stock: number;
}
/**
 *
 * @export
 * @interface SearchResponse
 */
export interface SearchResponse {
    /**
     *
     * @type {Array<GarmentItem>}
     * @memberof SearchResponse
     */
    items: Array<GarmentItem>;
    /**
     *
     * @type {number}
     * @memberof SearchResponse
     */
    currentPage: number;
    /**
     *
     * @type {number}
     * @memberof SearchResponse
     */
    totalPages: number;
}
/**
 * SearchApi - fetch parameter creator
 * @export
 */
export const SearchApiFetchParamCreator = function (configuration?: Configuration) {
    return {
        /**
         *
         * @summary searches for item
         * @param {string} criteria
         * @param {number} [page]
         * @param {number} [limit]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search(criteria: string, page?: number, limit?: number, options: any = {}): FetchArgs {
            // verify required parameter 'criteria' is not null or undefined
            if (criteria === null || criteria === undefined) {
                throw new RequiredError('criteria','Required parameter criteria was null or undefined when calling search.');
            }
            const localVarPath = `/search`;
            const localVarUrlObj = url.parse(localVarPath, true);
            const localVarRequestOptions = Object.assign({ method: 'GET' }, options);
            const localVarHeaderParameter = {} as any;
            const localVarQueryParameter = {} as any;

            if (criteria !== undefined) {
                localVarQueryParameter['criteria'] = criteria;
            }

            if (page !== undefined) {
                localVarQueryParameter['page'] = page;
            }

            if (limit !== undefined) {
                localVarQueryParameter['limit'] = limit;
            }

            localVarUrlObj.query = Object.assign({}, localVarUrlObj.query, localVarQueryParameter, options.query);
            // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
            delete localVarUrlObj.search;
            localVarRequestOptions.headers = Object.assign({}, localVarHeaderParameter, options.headers);

            return {
                url: url.format(localVarUrlObj),
                options: localVarRequestOptions,
            };
        },
    }
};

/**
 * SearchApi - functional programming interface
 * @export
 */
export const SearchApiFp = function(configuration?: Configuration) {
    return {
        /**
         *
         * @summary searches for item
         * @param {string} criteria
         * @param {number} [page]
         * @param {number} [limit]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search(criteria: string, page?: number, limit?: number, options?: any): (fetch?: FetchAPI, basePath?: string) => Promise<SearchResponse> {
            const localVarFetchArgs = SearchApiFetchParamCreator(configuration).search(criteria, page, limit, options);
            return (fetch: FetchAPI = isomorphicFetch, basePath: string = BASE_PATH) => {
                return fetch(basePath + localVarFetchArgs.url, localVarFetchArgs.options).then((response) => {
                    if (response.status >= 200 && response.status < 300) {
                        return response.json();
                    } else {
                        throw response;
                    }
                });
            };
        },
    }
};

/**
 * SearchApi - factory interface
 * @export
 */
export const SearchApiFactory = function (configuration?: Configuration, fetch?: FetchAPI, basePath?: string) {
    return {
        /**
         *
         * @summary searches for item
         * @param {string} criteria
         * @param {number} [page]
         * @param {number} [limit]
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        search(criteria: string, page?: number, limit?: number, options?: any) {
            return SearchApiFp(configuration).search(criteria, page, limit, options)(fetch, basePath);
        },
    };
};

/**
 * SearchApi - object-oriented interface
 * @export
 * @class SearchApi
 * @extends {BaseAPI}
 */
export class SearchApi extends BaseAPI {
    /**
     *
     * @summary searches for item
     * @param {string} criteria
     * @param {number} [page]
     * @param {number} [limit]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     * @memberof SearchApi
     */
    public search(criteria: string, page?: number, limit?: number, options?: any) {
        return SearchApiFp(this.configuration).search(criteria, page, limit, options)(this.fetch, this.basePath);
    }
}
