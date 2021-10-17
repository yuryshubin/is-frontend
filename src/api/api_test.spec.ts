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

import * as api from "./api"
import { Configuration } from "./configuration"

const config: Configuration = {}

describe("SearchApi", () => {
  let instance: api.SearchApi
  beforeEach(function() {
    instance = new api.SearchApi(config)
  });

  test("search", () => {
    const criteria: string = "criteria_example"
    const page: number = 56
    const limit: number = 56
    return expect(instance.search(criteria, page, limit, {})).resolves.toBe(null)
  })
})
