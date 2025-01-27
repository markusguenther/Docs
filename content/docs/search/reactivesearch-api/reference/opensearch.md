---
title: 'ReactiveSearch API for OpenSearch'
meta_title: 'ReactiveSearch API Reference | OpenSearch'
meta_description: 'ReactiveSearch API Reference for the OpenSearch search engine'
keywords:
    - concepts
    - appbase
    - search-relevance
    - opensearch
    - reactivesearch
sidebar: 'docs'
---

This guide helps you to learn more about the each property of `ReactiveSearch` API and explains that how to use those properties to build the query for different use-cases.

This guide is specific to the keys supported for the **OpenSearch** engine.

`ReactiveSearch API` request body can be divided into two parts, `query` and `settings`. The `query` key is an `Array` of objects where each object represents a `ReactiveSearch` query to retrieve the results. Settings(`settings`) is an optional key which can be used to control the search experience. Here is an example of the request body of `ReactiveSearch` API to get the results for which the `title` field matches with `iphone`.

```js
{
    query: [{
        id: "phone-search",
        dataField: "title",
        size: 10,
        value: "iphone"
    }],
    settings: { // optional
        recordAnalytics: true, // to enable the analytics
        enableQueryRules: true, // to enable the query rules
    }
}
```

## query

**This is a required field**

**Supported Engines**
Not dependent on engine, works for all.

### id

**This is a required field**

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

The unique identifier for the query can be referenced in the `react` property of other queries. The response of the `ReactiveSearch API` is a map of query ids to `Elasticsearch` response which means that `id` is also useful to retrieve the response for a particular query.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | true     |

### type

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property represents the type of the query which is defaults to `search`, valid values are `search`, `suggestion`, `term`, `range` & `geo`. You can read more [here](/docs/search/reactivesearch-api/implement/#type-of-queries).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Following values are supported for this field**

`````search`````, `````term`````, `````range`````, `````geo`````, `````suggestion`````

### react

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To specify dependent queries to update that particular query for which the react prop is defined. You can read more about it [here](/docs/reactivesearch/v3/advanced/reactprop/).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Example Playground**: 
<iframe src="https://play.reactivesearch.io/embed/fnTtSJmMehxSn3AAJWwi"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;" title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>

### highlight

This property can be used to enable the highlighting in the returned results. If set to `false`, [highlightField](/docs/search/reactivesearch-api/reference/#highlightfield) and [highlightConfig](/docs/search/reactivesearch-api/reference/#highlightconfig) values will be ignored.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/AjkyDj8zGt32xV2QcOcu"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### queryFormat

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Sets the query format, can be `or`, `and` and [date format](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html). Defaults to `or`.

- `or` returns all the results matching any of the search query text\'s parameters. For example, searching for "bat man" with or will return all the results matching either "bat" or "man".

- On the other hand with `and`, only results matching both "bat" and "man" will be returned. It returns the results matching all of the search query text\'s parameters."

- `queryFormat` can be set as Elasticsearch [date format](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html) for `range` type of queries. It allows Elasticsearch to parse the range values (dates) to a specified format before querying the data. You can find the valid date formats at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-date-format.html#built-in-date-formats).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9NwNk4QRJxdbX0zQviNE"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### dataField

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

database field(s) to be queried against, useful for applying search across multiple fields.
It accepts the following formats:
- `string`
- `DataField`
- `Array<string|DataField>`

The `DataField` type has the following shape:

```ts
type DataField = {
    field: string;
    weight: float;
};
```
For examples,

1. `dataField` without field weights
```js
    dataField: ['title', 'title.search']
```

2. `dataField` with field weights

```js
    dataField: [
        {
            "field": "title",
            "weight": 1
        },
        {
            "field": "title.search",
            "weight": 3
        }
    ]
```

3. `dataField` with and without field weights

```js
    dataField: [
        {
            "field": "title",
            "weight": 1
        },
        {
            "field": "title.search",
            "weight": 3
        },
        "description"
    ]
```

| <p style="margin: 0px;" class="table-header-text">Type</p>                                       | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------------------------------------------ | --------------------------- | -------- |
| `string | DataField | Array` | `all`                       | true     |

> Note:
> Multiple `dataFields` are not applicable for `term` and `geo` queries.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/FTOsW5jSBOzeNWEZy6FL"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### categoryField

**Supported Engines**
elasticsearch, mongodb, opensearch

Data field whose values are used to provide category specific suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `search`,`suggestion`       | false    |

> Note:
>
> The [aggregationSize](/docs/search/reactivesearch-api/reference/#aggregationsize) property can be used to control the size of category suggestions.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/adZAj2AcCVpDlHmNljl0"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### categoryValue

**Supported Engines**
elasticsearch, mongodb, opensearch

This is the selected category value. It is used for informing the search result.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `search`,`suggestion`       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9MswTJYI7pne7Awi5vWT"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### fieldWeights

**Supported Engines**
elasticsearch, opensearch

To set the search weight for the database fields, useful when you are using more than one [dataField](/docs/search/reactivesearch-api/reference/#datafield). This prop accepts an array of `floats`. A higher number implies a higher relevance weight for the corresponding field in the search results.

For example, the below query has two data fields defined and each field has a different field weight.

```js
{
    query: [{
        id: "book-search",
        dataField: ["original_title", "description"],
        fieldWeights: [3, 1],
        value: "harry"
    }]
}
```

| <p style="margin: 0px;" class="table-header-text">Type</p>         | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------------ | --------------------------- | -------- |
| `Array<int>` | `search`,`suggestion`       | false    |

> Note: The `fieldWeights` property has been marked as deprecated in <b>v7.47.0</b> and would be removed in the next major version of appbase.io. We recommend you to use the [dataField](/docs/search/reactivesearch-api/reference/#datafield) property to define the weights.

### nestedField

**Supported Engines**
elasticsearch, mongodb, opensearch

Set the path of the nested type under which the `dataField` is present. Only applicable only when the field(s) specified in the `dataField` is(are) present under a nested type mapping.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/d3ADrjDKGVuRYQ6cxKRa"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### from

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Starting document offset. Defaults to `0`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>              | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | ---------------------------------------- | -------- |
| `int` | `search`,`suggestion`,`geo`,`range`      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/vvurxeUDndDYLBfg0qNx"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### size

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the number of results to be returned by a query.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/O1BdUDaqk2aVkU4J0qOL"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### aggregationSize

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the number of buckets to be returned by aggregations.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `term`                      | false    |

> Note:
> 1. This property can also be used for `search` and `suggestion` type of queries when `aggregationField` or `categoryField` is set.
> 2. This is a new feature and only available for appbase versions >= 7.41.0.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/apAMBqEVwmgUJv2j7Y6C"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### sortBy

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to sort the results in a particular format. The valid values are:
- `asc`, sorts the results in ascending order,
- `desc`, sorts the results in descending order,
- `count`, sorts the aggregations by `count`.


| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`*                      | false    |

> Note:
>
> Please note that the `count` value can only be applied when the query type is of `term`. In addition, the [pagination](/docs/search/reactivesearch-api/reference/#pagination) property for the query needs to be set to `false` (default behavior). When pagination is `true`, a composite aggregation is used under the hood, which doesn\'t support ordering by count.

The `sortBy` value by default is set according to the following criterion:

- If field is `_score`, set as `desc`.
- If field is anything other than `_score`, set as `asc`

**Following values are supported for this field**

`````asc`````, `````desc`````, `````count`````

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/O8i1jMI5xlXM78rqxULu"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### sortField

**Supported Engines**
elasticsearch, solr, opensearch

This field should indicate the field that sort will be applied to. If not passed, then the first entry in the `dataField` (if passed as object or array) or the `dataField` itself (if passed as string) will be used.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `String`, `array of strings`, `array of string and objects` | `all`                       | false  |

The `sortField` key accepts different types of values:

#### 1. `string`

String can be passed where the string is a dataField where sorting is supposed to be done on, following is an example:

```json
{
    "sortField": "title"
}
```

> In the above example, `title` is the dataField on which sorting will be done.

In the above example, the sorting method will be the value of `sortBy` (if passed) else the default value (which is `asc` for any field other than `_score`).

#### 2. Array of string

An array of string can also be passed. This can be done in the following way:

```json
{
    "sortField": [
        "title",
        "author",
        "price"
    ]
}
```

> In the above example, `title`, `author` and `price` are valid dataFields on which sorting will be done.

In the above example, the sorting order will be based on the value of `sortBy` key if passed, or default to `asc` order. `_score` is a special field to sort by relevance, if specified, it is always sorted in `desc` order

#### 3. Array of string / object

`sortField` also accepts a combined array where some fields are passed as object. Following is an example:

```json
{
    "sortField": [
        "title",
        {"author": "desc"},
        {"price": "asc"}
    ]
}
```

In the above example, the sort order for `title` field will be `asc` (i.e. ascending). For the other fields, it will be as passed. The object should have the dataField as the **key** and the sort order as its **value**, only `asc` or `desc` are valid values here.

### value

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Represents the value for a particular query [type](/docs/search/reactivesearch-api/reference/#type), each kind of query has the different type of value format.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `any` | `all`                       | false    |

You can check the `value` format for different `type` of queries:

#### format for search type
The value can be a `string` or an `Array<string>`. The `Array<string>` format is interpreted as multiple values to be searched on.

**Example Playground**:
<iframe src="https://play.reactivesearch.io/embed/FX3oGSB8xhqnyXyKsPYe"  style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;"   title="rs-playground-Nbpi1vkkywun82Z8aqFP"></iframe>


**Example Playground (multi-value search)**:
<iframe src=https://play.reactivesearch.io/embed/e4RjjbQpQlFw7h61RKyz     style="width:100%; height:100%; border:1px solid;  overflow:hidden;min-height:400px;"     title=rs-playground-e4RjjbQpQlFw7h61RKyz   ></iframe>

### aggregationField

**Supported Engines**
elasticsearch, mongodb, opensearch

`aggregationField` enables you to get `DISTINCT` results (useful when you are dealing with sessions, events, and logs type data). It utilizes [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) which are newly introduced in ES v6 and offer vast performance benefits over a traditional terms aggregation.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/9Q46nHI7Re5vHal9M8he"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### after

**Supported Engines**
elasticsearch, mongodb, opensearch

This property can be used to implement the pagination for `aggregations`. We use the [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) of `Elasticsearch` to execute the aggregations\' query, the response of composite aggregations includes a key named `after_key` which can be used to fetch the next set of aggregations for the same query. You can read more about the pagination for composite aggregations at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html#_pagination).

You need to define the `after` property in the next request to retrieve the next set of aggregations.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/isUvzMDdjLFxTErHUw2i"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### includeNullValues

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

If you have sparse data or documents or items not having the value in the specified field or mapping, then this prop enables you to show that data.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/WN0V4iEgY80vRe9UQSvm"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### includeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be included in search results. Defaults to `[*]` which means all fields are included.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/i0wVmWCvfJJLJAWAEn0F"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### excludeFields

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Data fields to be excluded in search results.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/MXpPbR2OGdAQPbN2ox2H"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### fuzziness

**Supported Engines**
elasticsearch, mongodb, opensearch

Useful for showing the correct results for an incorrect search parameter by taking the fuzziness into account. For example, with a substitution of one character, `fox` can become `box`. Read more about it in the elastic search https://www.elastic.co/guide/en/elasticsearch/guide/current/fuzziness.html.

| <p style="margin: 0px;" class="table-header-text">Type</p>           | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------------- | --------------------------- | -------- |
| `int | string` | `search`, `suggestion`      | false    |

> Note:
>
> This property doesn\'t work when the value of [queryFormat](/docs/search/reactivesearch-api/reference/#queryformat) property is set to `and`."

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/FfBZDt4981lxD2At3KuK"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### searchOperators

**Supported Engines**
elasticsearch, mongodb, opensearch

Defaults to `false`. If set to `true` then you can use special characters in the search query to enable an advanced search behavior. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-simple-query-string-query.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

> Note: If both properties `searchOperators` and `queryString` are set to `true` then `queryString` will have the priority over `searchOperators`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/yb5IhaBzF9qUXtTam5j7"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlight

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to enable the highlighting in the returned results. If set to `false`, [highlightField](/docs/search/reactivesearch-api/reference/#highlightfield) and [highlightConfig](/docs/search/reactivesearch-api/reference/#highlightconfig) values will be ignored.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/AjkyDj8zGt32xV2QcOcu"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### highlightField

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When highlighting is `enabled`, this property allows specifying the fields which should be returned with the matching highlights. When not specified, it defaults to apply highlights on the field(s) specified in the `dataField` prop.

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/GcO9cz4HSDeYh6xBzlrq"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### customHighlight

**Supported Engines**
elasticsearch, opensearch

### highlightConfig

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

It can be used to set the custom highlight settings. You can read the `Elasticsearch` docs for the highlight options at [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-highlighting.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/ycCvpsb6ZiWFrEIEPxMX"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### interval

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

To set the histogram bar interval, applicable when [aggregations](/docs/search/reactivesearch-api/reference/#aggregations) value is set to `["histogram"]`. Defaults to `Math.ceil((range.end - range.start) / 100) || 1`.

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `int` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/k5MeCmPeELaWvTYeqoGl"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### aggregations

**Supported Engines**
elasticsearch, mongodb, solr, opensearch


It helps you to utilize the built-in aggregations for `range` type of queries directly, valid values are:
- `max`: to retrieve the maximum value for a `dataField`,
- `min`: to retrieve the minimum value for a `dataField`,
- `histogram`: to retrieve the histogram aggregations for a particular `interval`

| <p style="margin: 0px;" class="table-header-text">Type</p>            | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| --------------- | --------------------------- | -------- |
| `Array<string>` | `range`                     | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/cnHhcTQ4nSiMzyaNtA4y"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### missingLabel

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Defaults to `N/A`. It allows you to specify a custom label to show when [showMissing](/docs/search/reactivesearch-api/reference/#showmissing) is set to `true`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `term`                      | false    |

> Note: This property doesn\'t work when [pagination](/docs/search/reactivesearch-api/reference/#pagination) is set to `true`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/QoFtxI5RCI5c4BWnCfRH"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### showMissing

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Defaults to `false`. When set to `true` then it also retrieves the aggregations for missing fields.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `term`                      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/Ht0aHbUljvjjFVny2X2Y"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### defaultQuery

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property is useful to customize the source query, as defined in Elasticsearch Query DSL. It is different from the [customQuery](/docs/search/reactivesearch-api/reference/#customquery) in a way that it doesn\'t get leaked to other queries(dependent queries by `react` prop) and only modifies the query for which it has been applied.

You can read more about the `defaultQuery` usage over [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/DxQUolzQZnhas6Hma15A"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### customQuery

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Custom query property will be applied to the dependent queries by `react` property, as defined in Elasticsearch Query DSL. You can read more about the `customQuery` usage over [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-custom-query).

> Note:
>
> It\'ll not affect that particular query for which it has been defined, it\'ll only affect the query for dependent queries. If you want to customize the source query then use the [defaultQuery](/docs/search/reactivesearch-api/reference/#defaultquery) property instead.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `Object` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/IIPiPFpXbPbhKtL3IoPt"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### execute

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

Sometimes it may require that you want to apply some query for results with the help of `react` property but want to avoid any un-necessary query execution for the performance reasons. If you set `execute` to `false` for a particular query then you can use it with `react` prop without executing it.
For example, consider a scenario where we want to filter the search query by some range. To implement it with RS API we need to define two queries(search & range type). Since you defined the two queries then by default both queries will get executed, however you can avoid this by setting `execute` to `false` for the range query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   |<p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `all`                       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/NSUbJjAEdAERswHFV6lv"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enableSynonyms

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

This property can be used to control (enable/disable) the synonyms behavior for a particular query. Defaults to `true`, if set to `false` then fields having `.synonyms` suffix will not affect the query.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/FLwTmwBpcLZezTW3Wg5D"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### selectAllLabel

**Supported Engines**
elasticsearch, mongodb, opensearch

This property allows you to add a new property in the list with a particular value in such a way that when selected i.e `value` is similar/contains to that label(`selectAllLabel`) then `term` query will make sure that the `field` exists in the `results`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `term`                      | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/N1lkEUFb3W2SEKgJ1D2L"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### pagination

**Supported Engines**
elasticsearch, mongodb, opensearch

This property allows you to implement the `pagination` for `term` type of queries. If `pagination` is set to `true` then appbase will use the [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html) of Elasticsearch instead of [terms aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>  | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ----- | --------------------------- | -------- |
| `bool` | `term`                     | false    |

> Note:
> 1. Sort by as `count` doesn\'t work with composite aggregations i.e when `pagination` is set to `true`.
> 2. The [missingLabel](/docs/search/reactivesearch-api/reference/#missinglabel) property also won\'t work when composite aggregations have been used.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/isUvzMDdjLFxTErHUw2i"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### queryString

**Supported Engines**
elasticsearch, mongodb, opensearch

Defaults to `false`. If set to `true` than it allows you to create a complex search that includes wildcard characters, searches across multiple fields, and more. Read more about it [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `bool` | `search`,`suggestion`       | false    |

> Note: If both properties `searchOperators` and `queryString` are set to `true` then `queryString` will have the priority over `searchOperators`.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/HEJtHdiyKC4LwE0cC1ZA"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### rankFeature

**Supported Engines**
elasticsearch, opensearch

This property allows you to define the [Elasticsearch rank feature query](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#query-dsl-rank-feature-query) to boost the relevance score of documents based on the `rank_feature` fields.

| <p style="margin: 0px;" class="table-header-text">Type</p>   | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------ | --------------------------- | -------- |
| `object` | `search`,`suggestion`     | false    |

The `rankFeature` object must be in the following shape:
```ts
{
    "field_name": {
        "boost": 1.0,
        "function_name": "function_object"
    }
}
```
- `field_name` It represents the `dataField` that has the `rank_feature` or `rank_features` mapping.
- `boost` [optional] A floating point number (shouldn\'t be negative) that is used to decrease (if the value is between 0 and 1) or increase relevance scores (if the value is greater than 1). Defaults to 1.
- `function_name` To calculate relevance scores based on rank feature fields, the rank_feature query supports the following mathematical functions:
    - [saturation](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-saturation)
    - [log](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-logarithm)
    - [sigmoid](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-rank-feature-query.html#rank-feature-query-sigmoid)
- `function_object` The function object can be used to override the default values for functions.
    - `saturation` function supports the `pivot` property that must be greater than zero.
    - `log` function supports the `scaling_factor` property
    - `sigmoid` function supports `pivot` and `exponent`[must be positive] properties

The following example uses a rank feature field named `pagerank` with `saturation` function.

```js
    {
        "id": "search",
        "dataField": ["content"],
        "value": "2016",
        "rankFeature": {
            "pagerank": {
                "saturation": {
                    "pivot": 2
                }
            }
        }
    }
```

The following example uses the `boost` property to boost the relevance score based on the `pagerank` field.

```js
    {
        "id": "search",
        "dataField": ["content"],
        "value": "2016",
        "rankFeature": {
            "pagerank": {
                "boost": 2.0
            }
        }
    }
```

The following example uses all three functions (`saturation`, `log` and `sigmoid`) to boost the relevance scores.

```js
    {
    "query": [
        {
            "id": "search",
            "dataField": [
                "content"
            ],
            "value": "2016",
            "rankFeature": {
                "pagerank": {
                    "saturation": {
                        "pivot": 2
                    }
                },
                "url_length": {
                    "log": {
                        "scaling_factor": 1
                    }
                },
                "topics.sports": {
                    "sigmoid": {
                        "pivot": 2,
                        "exponent": 1
                    }
                }
            }
        }
    ]
}
```

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/moCjhTRZK14FNsA9mvNo"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### distinctField

**Supported Engines**
elasticsearch, opensearch

This property returns only the distinct value documents for the specified field. It is equivalent to the `DISTINCT` clause in SQL. It internally uses the collapse feature of Elasticsearch. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `string` | `all`                  | false    |

The following query would return the products for distinct brands.
```js
{
    "query": [
        {
            "id": "test",
            "dataField": [
                "product_name"
            ],
            "distinctField": "brand.keyword",
        }
    ]
}
```

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/AwwZ3kuEF2QhQ9M38yPA"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### distinctFieldConfig

**Supported Engines**
elasticsearch, opensearch

This property allows specifying additional options to the `distinctField` property. Using the allowed DSL, one can specify how to return K distinct values (default value of K=1), sort them by a specific order, or return a second level of distinct values. `distinctFieldConfig` object corresponds to the `inner_hits` key\'s DSL. You can read more about it over [here](https://www.elastic.co/guide/en/elasticsearch/reference/current/collapse-search-results.html).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `object` | `all`                       | false    |

The following query would return the products for distinct brands. Additionally, it would return the top five products for each brand.
```js
{
    "query": [
        {
            "id": "test",
            "dataField": [
                "product_name"
            ],
            "distinctField": "brand.keyword",
            "distinctFieldConfig": {
                "inner_hits": {
                    "name": "most_recent",
                    "size": 5,
                    "sort": [
                        {
                            "crawl_timestamp.keyword": "asc"
                        }
                    ]
                },
                "max_concurrent_group_searches": 4
            }
        }
    ]
}
```

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/RrD7aB3vstYvPZxfaHNo"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### index

**Supported Engines**
elasticsearch, mongodb, opensearch

The `index` property can be used to explicitly specify an `index` for a particular query. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `index` path variable defined in the URL.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| -------- | --------------------------- | -------- |
| `string` | `all`                       | false    |


Let\'s take this example to see how this works:

```
URL: /my-index/_reactivesearch.v3

Body:
{
	"query": [
	  {
		 "id": "search",
		 "type": "search",
		 ...
	  },
	  {
		 "id": "facet",
		 "type": "term",
		 "index": "optimized-facet-index"
	  }
	]
}
```

Here, the first query uses the `my-index` index to query against, as specified in the request URL. However, the second query will use the `optimized-facet-index` index as specified by the `index` key in it.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/GsFi6AyoFYD0iiGhNgQi"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enableRecentSuggestions

**Supported Engines**
elasticsearch, opensearch

When set to `true`, recent searches are returned as suggestions as per the recent suggestions config (either defaults, or as set through [recentSuggestionsConfig](/docs/search/reactivesearch-api/reference/#recentsuggestionsconfig) or via Recent Suggestions settings in the control plane).


| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p>e | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### recentSuggestionsConfig

**Supported Engines**
elasticsearch, opensearch

Specify additional options for fetching recent suggestions. It can accept the following keys:

- **size**: `int` Maximum number of recent suggestions to return. Defaults to 5.

- **minHits**: `int` Return only recent searches that returned at least minHits results. There is no default minimum hits-based restriction.

- **minChars**: `int` Return only recent suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.

- **index**: `string` Index(es) from which to return the recent suggestions from. Defaults to the entire cluster.

> Note: It is possible to define multiple indices using comma separated pattern, for e.g `products,categories`.

- **customEvents** `Object` Custom analytics events to filter the recent suggestions.
For example,
```js
    "recentSuggestionsConfig": {
        "customEvents": {
            "browser": "Chrome",
            "user_id": "john@appbase.io"
        }
    }
```

**sectionLabel**: `string` To define the section title for recent suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object` | `suggestion`                | false    |

**sectionLabel**: `string` To define the section title for popular suggestions.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/VaJF1wffzE2guKfyEhBr"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### enablePopularSuggestions

**Supported Engines**
elasticsearch, mongodb, solr, opensearch

When set to `true`, popular searches based on aggregate end-user data are returned as suggestions as per the popular suggestions config (either defaults, or as set through [popularSuggestionsConfig](/docs/search/reactivesearch-api/reference/#popularsuggestionsconfig) or via Popular Suggestions settings in the control plane)

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### popularSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify additional options for fetching popular suggestions. It can accept the following keys:

- **size**: `int` Maximum number of popular suggestions to return. Defaults to `5`.

- **minCount**: `int` Return only popular suggestions that have been searched at least minCount times. There is no default minimum count-based restriction.

- **minChars**: `int` Return only popular suggestions that have minimum characters, as set in this property. There is no default minimum character-based restriction.

- **showGlobal**: `Boolean` Defaults to true. When set to `false`, return popular suggestions only based on the current user\'s past searches.

- **index**: `string` Index(es) from which to return the popular suggestions from. Defaults to searching the entire cluster.

> Note: It is possible to define multiple indices using a comma separated pattern, for e.g `products,categories`.

- **customEvents** `Object` Custom analytics events to filter the popular suggestions.
For example,
```js
    "popularSuggestionsConfig": {
        "customEvents": {
            "browser": "Chrome",
            "user_id": "john@appbase.io"
        }
    }
```

**sectionLabel**: `string` To define the section title for popular suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object` | `suggestion`                | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/3H9Z2lOjp7nQjDqnHDZY"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### showDistinctSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

### enablePredictiveSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, it predicts the next relevant words from the value of a field based on the search query typed by the user. When set to false (default), the matching document field\'s value would be displayed.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### maxPredictedWords

**Supported Engines**
elasticsearch, solr, opensearch

Defaults to `2`. This property allows configuring the maximum number of relevant words that are predicted. Valid values are between `[1, 5]`.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `int`    | `suggestion`                | false    |

### urlField

**Supported Engines**
elasticsearch, solr, opensearch

Data field whose value contains a URL. This is a convenience prop that allows returning the URL value in the suggestion\'s response.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `string` | `suggestion`                | false    |

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/2YaNeEx4AEF4PHeJrSdw"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### applyStopwords

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, it would not predict a suggestion which starts or ends with a stopword. You can use [searchLanguage](/docs/search/reactivesearch-api/reference/#searchlanguage) property to apply language specific stopwords.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### customStopwords

**Supported Engines**
elasticsearch, solr, opensearch

It allows you to define a list of custom stopwords. You can also set it through `Index` settings in the control plane.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `array`   | `suggestion`               | false    |

### searchLanguage

**Supported Engines**
elasticsearch, solr, opensearch

Search language is useful to apply language specific stopwords for predictive suggestions. Defaults to [english](https://github.com/bbalet/stopwords/blob/master/stopwords_en.go#L7) language.

We support following languages:

- [arabic](https://github.com/bbalet/stopwords/blob/master/stopwords_ar.go#L7)
- [bulgarian](https://github.com/bbalet/stopwords/blob/master/stopwords_bg.go#L7)
- [czech](https://github.com/bbalet/stopwords/blob/master/stopwords_cs.go#L7)
- [danish](https://github.com/bbalet/stopwords/blob/master/stopwords_da.go#L7)
- [english](https://github.com/bbalet/stopwords/blob/master/stopwords_en.go#L7)
- [finnish](https://github.com/bbalet/stopwords/blob/master/stopwords_fi.go#L7)
- [french"](https://github.com/bbalet/stopwords/blob/master/stopwords_fr.go#L7)
- [german"](https://github.com/bbalet/stopwords/blob/master/stopwords_de.go#L7)
- [hungarian](https://github.com/bbalet/stopwords/blob/master/stopwords_hu.go#L7)
- [italian"](https://github.com/bbalet/stopwords/blob/master/stopwords_it.go#L7)
- [japanese](https://github.com/bbalet/stopwords/blob/master/stopwords_ja.go#L7)
- [latvian](https://github.com/bbalet/stopwords/blob/master/stopwords_lv.go#L7)
- [norwegian](https://github.com/bbalet/stopwords/blob/master/stopwords_no.go#L7)
- [persian](https://github.com/bbalet/stopwords/blob/master/stopwords_fa.go#L7)
- [polish](https://github.com/bbalet/stopwords/blob/master/stopwords_pl.go#L7)
- [portuguese](https://github.com/bbalet/stopwords/blob/master/stopwords_pt.go#L7)
- [romanian](https://github.com/bbalet/stopwords/blob/master/stopwords_ro.go#L7)
- [russian](https://github.com/bbalet/stopwords/blob/master/stopwords_ru.go#L7)
- [slovak](https://github.com/bbalet/stopwords/blob/master/stopwords_sk.go#L7)
- [spanish](https://github.com/bbalet/stopwords/blob/master/stopwords_es.go#L7)
- [swedish](https://github.com/bbalet/stopwords/blob/master/stopwords_sv.go#L7)
- [thai](https://github.com/bbalet/stopwords/blob/master/stopwords_th.go#L7)
- [turkish ](https://github.com/bbalet/stopwords/blob/master/stopwords_tr.go#L7)

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `string` | `suggestion`                | false    |

### calendarInterval

**Supported Engines**
elasticsearch, solr, opensearch

### script

**Supported Engines**
elasticsearch, opensearch

This field indicates the script to run while reordering the results. This script will be executed through ElasticSearch/OpenSearch directly and won\'t be run by ReactiveSearch.

| Type | Applicable on query of type | Required |
| --- | --- | --- |
| `string` | `search`, `suggestion` | false |

#### ElasticSearch

For ElasticSearch, the script should be written in [painless](https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting-painless.html). By default the value is set to:

```js
cosineSimilarity(params.queryVector, params.dataField) + 1.0
```

Following is an example to pass the above script:

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.3],
            "script": "cosineSimilarity(params.queryVector, params.dataField) + 1.0"
        }
    ]
}
```

#### OpenSearch

For OpenSearch, the script can be one of the following values:

1. `l2`
2. `l1`
3. `cosinesimil`
4. `hammingbit`

The default is set to `cosinesimil`.

Following is an example to pass the script field for opensearch

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.3],
            "script": "cosinesimil"
        }
    ]
}
```

### queryVector

**Supported Engines**
elasticsearch, opensearch

Specify a vector to match for the reordering the results using kNN (k-Nearest Neighbor). This is a **required** field in order to invoke reordering of results using the kNN functionality provided by ElasticSearch/OpenSearch.

| Type | Applicable on query of type | Required |
| --- | --- | --- |
| `array of float` | `search`, `suggestion` | false |

This field should contain a vector with the **same dimensions** as the one that is stored in the index.

> If dimensions passed are incorrect, ElasticSearch/OpenSearch will raise an error.

Following is an example of how `queryVector` can be passed:

```json
{
    "query": [
        {
            "value": "sudoku",
            "queryVector": [-0.2331661581993103,-0.5119812488555908,-0.20364709198474884,-0.017901159822940826,0.08372976630926132,-0.03920120745897293,-0.23098187148571014,0.007446368224918842,-0.0009111426770687103,0.1272595077753067,0.28950294852256775,-0.06371814012527466,-0.5949097871780396,-0.5060590505599976,0.17875957489013672,0.22064043581485748,-0.6796668767929077,-0.3525505065917969,0.42379963397979736,-0.42745235562324524,0.2099888026714325,0.48492124676704407,-0.35895538330078125,-0.49400103092193604,-0.005789548624306917,-0.17857830226421356,0.13250510394573212,0.26827022433280945,-0.08636230230331421,-0.19893890619277954,-0.041345737874507904,0.8208211064338684,0.01703900657594204,0.5471616983413696,-0.0738692581653595,0.12254869937896729,-0.02414802461862564,0.11759355664253235,0.019515985623002052,-0.18783052265644073,0.17069348692893982,-0.07640694826841354,-0.2151077538728714,-0.7002893686294556,-0.1806059330701828,-0.5210077166557312,0.27444106340408325,0.11414806544780731,0.03172197937965393,0.42730292677879333,0.12688499689102173,-0.35485270619392395,-0.06171729043126106,0.5157531499862671,-0.2849454879760742,-0.2677580714225769,0.9749475717544556,-0.881539523601532,0.14058096706867218,0.4889276325702667,0.6216640472412109,0.08026044070720673,-0.033269211649894714,0.3361513018608093,-0.18949778378009796,0.07237450033426285,0.2361348271369934,0.2093207836151123,0.09699517488479614,0.2089412361383438,-0.23940812051296234,-0.043159119784832,0.10608129948377609,-0.3437037765979767,-0.177464097738266,-0.13291364908218384,0.3128313422203064,-0.15028196573257446,-0.09288058429956436,0.2592775225639343,-0.16746601462364197,-0.2883719205856323,0.5873657464981079,0.33847862482070923,-0.5174468755722046,-0.8312110304832458,-0.1251358538866043,0.033250827342271805,-0.3757703900337219,0.17313288152217865,-0.1745336502790451,0.41333484649658203,-0.03387550637125969,-0.1785455197095871,0.05075903609395027,0.559604823589325,0.5723441243171692,0.8997594118118286,0.05775456130504608,0.2719365060329437,0.6201620101928711,-0.5533060431480408,-0.05015310272574425,0.1179390549659729,-0.29218602180480957,-0.25434285402297974,-0.12258130311965942,-0.0967710092663765,0.21071767807006836,-0.013736761175096035,0.052261482924222946,-0.029489342123270035,-0.021823573857545853,-0.42057162523269653,0.15497387945652008,-0.16275420784950256,-0.33142462372779846,0.0004759756848216057,0.269857257604599,0.5432202816009521,-0.5237261056900024,-0.8402623534202576,0.14155001938343048,0.13337163627147675,0.2380906045436859,-0.5562257766723633,-0.27338600158691406,0.6469905376434326,-0.051116228103637695,0.15798717737197876,0.08914382755756378,0.5993743538856506,0.2264786958694458,-0.04486028850078583,-0.5007220506668091,-0.16833321750164032,-0.20136581361293793,-0.23667672276496887,-0.473002165555954,-0.065907321870327,0.12392953783273697,-0.22214652597904205,-0.5501930117607117,0.5560768842697144,-0.16843712329864502,0.3893982470035553,0.34563466906547546,0.14359042048454285,0.9332857728004456,0.3020212650299072,-0.22259725630283356,0.06930424273014069,-0.2098097950220108,-0.5328831076622009,0.20332029461860657,0.07024030387401581,-0.12438388168811798,0.6291709542274475,0.09008827805519104,-0.22997644543647766,0.08304019272327423,0.06343194842338562,-0.5535833835601807,-0.02605622634291649,0.06758299469947815,0.3230549097061157,-0.46194976568222046,0.054310522973537445,0.4185032844543457,0.026052499189972878,-1.0150647163391113,-0.009153230115771294,0.32256174087524414,0.14404849708080292,0.30470767617225647,0.03789076209068298,-0.2712087333202362,0.18838411569595337,0.215865358710289,0.3538733422756195,0.09725626558065414,-0.15920519828796387,-0.4282386302947998,-0.06521840393543243,0.3067934215068817,0.27080076932907104,-0.17876115441322327,0.1094152182340622,-0.4777008593082428,0.13061970472335815,0.06509595364332199,-0.29990559816360474,0.2943037152290344,-0.09804008156061172,0.8623484373092651,-0.4885147511959076,0.1346253901720047,-0.08107998222112656,-0.0932597890496254,-0.21353742480278015,-0.38147640228271484,-0.37697428464889526,0.08630738407373428,0.35133713483810425,0.056493110954761505,0.12346173077821732,0.12784984707832336,0.526689887046814,0.22705964744091034,0.12600943446159363,-0.3789721429347992,-0.027972102165222168,-0.14694465696811676,0.08760202676057816,-0.07566612958908081,0.2654574513435364,-0.041679948568344116,0.07595469057559967,-0.013962095603346825,0.24891911447048187,0.5120809674263,0.36586958169937134,-0.17612852156162262,0.13918855786323547,0.03616257756948471,0.40768882632255554,0.334963321685791,0.06332334876060486,-0.30538511276245117,0.2407899796962738,0.48032957315444946,-0.4016968607902527,0.13408133387565613,0.23806314170360565,-0.09603121131658554,0.2030562162399292,-0.35480499267578125,0.07937025278806686,0.8227477073669434,0.16975322365760803,-0.44362756609916687,-0.12385094165802002,0.32019010186195374,0.4558042585849762,0.5848757028579712,-0.5542488098144531,0.03477984294295311,0.316226989030838,0.30629947781562805,-0.26321473717689514,-0.10309582203626633,0.13515621423721313,-0.25837427377700806,-0.3433460295200348,0.622564435005188,-0.27224525809288025,-0.34594491124153137,-0.45550379157066345,0.17615453898906708,0.034812718629837036,0.6683401465415955,0.20284457504749298,0.0969584584236145,0.31195810437202454,-0.35766083002090454,0.023656994104385376,0.18322645127773285,-0.3598155677318573,0.07308720052242279,0.03287686035037041,-0.43911150097846985,-0.3543386161327362,-0.056612249463796616,0.11635749787092209,-0.2700275480747223,-0.07371004670858383,0.3404487371444702,-0.33070632815361023,-0.4284154772758484,-0.03435737267136574,0.4003504812717438,-0.028103966265916824,0.26546192169189453,-0.40131789445877075,0.5367679595947266,-0.12510822713375092,-0.36415529251098633,-0.3152112662792206,0.4300119876861572,0.09085322171449661,-1.0577857494354248,0.25852563977241516,-0.1496814638376236,0.20363523066043854,0.7180604338645935,0.1369035392999649,0.06539177149534225,-0.19852226972579956,-0.15276876091957092,0.48966142535209656,0.11427905410528183,-0.6464053392410278,-0.023242367431521416,0.11634155362844467,-0.10501517355442047,0.2579817771911621,0.28618156909942627,-0.10608886182308197,0.5644744634628296,-0.0820259153842926,0.025749702006578445,0.28516265749931335,-0.08493506163358688,-0.14013515412807465,-0.45475029945373535,-0.255614310503006,0.1087619811296463,0.11168747395277023,0.05345556512475014,-0.33836686611175537,-0.40951403975486755,-0.30897781252861023,-0.1947154700756073,0.5395888686180115,-0.15146473050117493,0.33496928215026855,0.056776661425828934,-0.9708009958267212,-0.3661959171295166,-0.09084014594554901,0.18116715550422668,-0.4152784049510956,0.06998911499977112,0.0588533915579319,0.7766225337982178,-0.7686713337898254,-0.5566105842590332,0.1343229115009308,-0.024979785084724426,-0.19050787389278412,0.3546283543109894,0.3595810532569885,0.3909873366355896,0.4323141574859619,-0.44930246472358704,-0.0796913355588913,-0.11393226683139801,0.036659423261880875,-0.42009007930755615,-0.0765325278043747,-0.3772854208946228,0.3351496458053589,0.41209709644317627,0.14758527278900146,-0.24971534311771393,0.2848503291606903,0.23911622166633606,-0.6206141710281372,-0.13347044587135315,0.17428961396217346,-0.1253173053264618,0.15241989493370056,-0.2891548275947571,-0.18908852338790894,0.061173323541879654,-0.12420549988746643,-0.1967189610004425,-0.4063069820404053,-0.14208103716373444,0.49876049160957336,0.12996149063110352,0.0950450450181961,0.13888780772686005,0.692167341709137,-0.4051661193370819,-0.21751108765602112,-0.23082005977630615,0.04905037581920624,-0.15012867748737335,0.23187394440174103,-0.3038657307624817,0.13231335580348969,0.16540852189064026,-0.39576011896133423,0.015005701221525669,0.5359526872634888,0.3572046458721161,-0.8274846076965332,-0.3985580801963806,0.1429898589849472,0.29793408513069153,-0.13604670763015747,-0.14827734231948853,-0.22695747017860413,-0.11175956577062607,-0.1852235496044159,0.09620548784732819,0.37795281410217285,0.016744351014494896,0.3065446615219116,0.06667613238096237,-0.12026382237672806,-0.3758532404899597,0.07473888248205185,-0.30974316596984863,-0.40056368708610535,-0.39022067189216614,0.13905949890613556,-0.27837032079696655,0.3056820333003998,-0.28379493951797485,0.009814701974391937,-0.8353288769721985,-0.23119042813777924,0.09879287332296371,0.2082364708185196,0.1558394432067871,-0.17530716955661774,0.15658630430698395,0.302120566368103,-0.07142913341522217,0.008485805243253708,0.609083890914917,-0.021523503586649895,0.8157124519348145,-0.4905656576156616,0.06193997338414192,0.695164680480957,0.4753653109073639,0.014090241864323616,-0.10896910727024078,-0.513911247253418,-0.4562393128871918,0.07743897289037704,0.19989600777626038,0.1907031536102295,0.5728108882904053,-0.10292324423789978,-0.07339252531528473,-0.29925328493118286,-0.09566930681467056,0.488466739654541,-0.30072054266929626,0.28416958451271057,-0.0890093445777893,-0.08397834002971649,-0.7575096487998962,0.3871583938598633,-0.0994277149438858,-0.0651523545384407,-0.36569684743881226,-0.022579560056328773,0.5327531099319458,0.21976502239704132,0.10100045800209045,-0.3756444454193115,-0.5957355499267578,-0.0020291833207011223,-0.25804316997528076,-0.09465666860342026,0.13335798680782318,-0.3466417193412781,-0.020166613161563873,-0.6182003617286682,-0.5904971361160278,0.4127148687839508,0.045516662299633026,-0.5832351446151733,-0.1258527934551239,-0.2707494795322418,-0.3631637394428253,0.7492590546607971,0.31302979588508606,-0.04968494921922684,-0.20981331169605255,0.16441382467746735,-0.09023677557706833,-0.13258850574493408,0.23021656274795532,-0.4215551018714905,0.14413845539093018,-0.32024163007736206,0.6429256200790405,0.2351188361644745,-0.11894956231117249,0.19824177026748657,-0.4716150462627411,-0.35586053133010864,-0.16862289607524872,-0.10510728508234024,-0.5004174113273621,-0.11961700022220612,-0.1059349849820137,0.05861257016658783,-0.012048710137605667,0.40558958053588867,0.3871528208255768,-0.32725095748901367,-0.22044792771339417,-0.12327778339385986,-0.2945428788661957,0.041948821395635605,-0.3235156238079071,-0.5477138757705688,-0.1550917625427246,-0.9751694202423096,-0.14570793509483337,0.07708272337913513,-0.04620423540472984,-0.04339462146162987,-0.7331159710884094,-0.5754250884056091,-0.06821538507938385,0.22867058217525482,-0.1439916491508484,-0.15181641280651093,0.4870591461658478,-0.031370893120765686,-0.4940066933631897,0.14567743241786957,0.11159632354974747,0.32585227489471436,-0.07052605599164963,0.46836018562316895,0.3961951434612274,-0.4930388629436493,-0.04429520666599274,-0.6688261032104492,-0.10358863323926926,0.004773723892867565,0.020085323601961136,-0.17634840309619904,0.27046358585357666,-0.6241454482078552,-0.5080737471580505,-0.11638706177473068,-0.2262801080942154,0.16296862065792084,-0.2684020400047302,-0.20280051231384277,-0.06850574165582657,-0.6212018132209778,-1.1227725744247437,0.11263316869735718,0.6565579771995544,0.44997838139533997,0.01276746578514576,-0.057134345173835754,0.7298813462257385,0.5343319773674011,0.38831791281700134,0.4593892991542816,-0.4731118381023407,-0.25826990604400635,-0.13944020867347717,0.6276473999023438,-0.24466639757156372,-0.34358420968055725,0.3398870825767517,-0.06421176344156265,-0.21659399569034576,-1.0672786235809326,-0.11337363719940186,-0.30320653319358826,-0.22722353041172028,0.12748388946056366,-0.5685656666755676,0.2012287825345993,0.011397304944694042,0.4709486961364746,0.5709617733955383,0.4292752742767334,0.01594310626387596,0.4242568016052246,0.35711902379989624,-0.16230180859565735,-0.3821635842323303,0.1560583859682083,0.09462247043848038,0.5443540215492249,-0.9704424738883972,-0.38478678464889526,-0.11353015154600143,-0.7009897828102112,-0.26901036500930786,0.12976206839084625,0.04336809739470482,-0.048485517501831055,-0.142513245344162,0.27510449290275574,-0.039446622133255005,-0.022247549146413803,-0.029576336964964867,0.5240309238433838,-0.7161761522293091,-0.26570597290992737,-0.7037824392318726,0.4700125455856323,-0.17833907902240753,0.34102171659469604,-1.1803295612335205,-1.0827176570892334,0.17109236121177673,0.5559585094451904,0.26330116391181946,-0.10594885051250458,-0.11209619045257568,-0.306750625371933,0.822174072265625,-0.2322768270969391,0.7479469776153564,0.23786330223083496,0.16560563445091248,0.1350373476743698,0.22507897019386292,-0.264628142118454,0.4656071960926056,0.6644494533538818,1.0575904846191406,0.5383290648460388,-0.013262063264846802,-0.6138190627098083,0.35417479276657104,-0.7310577034950256,0.8990108370780945,0.30695557594299316,0.2619588077068329,0.5402860641479492,0.037448443472385406,0.1811509132385254,0.14190629124641418,0.1086638793349266,-0.13714200258255005,0.8685406446456909,-0.2868627607822418,-0.06360051780939102,-0.164109468460083,0.37639644742012024,-0.057096928358078,0.635757327079773,0.07558296620845795,-0.2050892412662506,-0.5498195886611938,-0.6916136741638184,-0.2975374460220337,0.1609482318162918,-0.03316524252295494,0.42304617166519165,0.18043111264705658,0.5477114319801331,-0.2664727568626404,-0.029166080057621002,0.14954274892807007,-0.3421504497528076,-0.04253886267542839,-0.14429907500743866,-0.6267624497413635,0.29395774006843567,-0.18779926002025604,0.024463757872581482,0.0760602355003357,-0.17330791056156158,-0.08093205839395523,-0.08694751560688019,-0.18113407492637634,1.0449696779251099,-0.27534568309783936,-0.4596651494503021,0.0802769660949707,-0.48402607440948486,-0.3915584087371826,-0.12843932211399078,0.5243167877197266,-0.1402605175971985,0.480273574590683,-0.0021980199962854385,0.12998893857002258,-0.48630863428115845,0.08282945305109024,0.5846433639526367,-0.2247890830039978,0.03295814245939255,-0.1942577064037323,-0.5635294318199158,0.6014246344566345,0.24816656112670898,0.25474804639816284,0.2547151446342468,0.3304654657840729,-0.049010131508111954,0.20212715864181519,-0.5719394683837891,-0.3322967290878296,0.41074737906455994,-0.35127660632133484,0.27512362599372864,-0.02619776874780655,0.20298445224761963,-0.284409761428833,0.07049036771059036,0.1520823985338211,0.2946247458457947,0.05478810518980026,-0.24169102311134338,0.025495590642094612,0.44150108098983765,-0.30582061409950256,-0.07481212168931961,-0.017815416678786278,-0.07302330434322357,0.26626038551330566,0.23972545564174652,0.6558575630187988,-0.21604980528354645,-0.0328105092048645,0.21881070733070374,0.07092849910259247,-0.5614179968833923,0.0041782124899327755,0.025988582521677017,0.05458508059382439,0.039211638271808624,0.3957882821559906,-0.42127013206481934,-0.29678159952163696,-0.16160798072814941,-0.6118954420089722,-0.3274058699607849,0.14464861154556274,0.26805394887924194,0.1344146728515625,0.17574827373027802,-0.5594807267189026,0.025312628597021103,0.15255481004714966,-0.5118966102600098,-0.3523229956626892,-0.33645230531692505,0.5468505024909973,0.18022316694259644,-0.5633986592292786,-0.9421330690383911,0.2769765853881836,0.6537157297134399,0.3649637997150421,-0.1879594773054123,0.3940514028072357,-0.22558000683784485,-0.5322285890579224,0.13269251585006714,0.4791545271873474,0.5662456750869751,-0.25244954228401184,0.2351442277431488,0.04853489622473717,-0.22637133300304413,0.29767510294914246,0.13879689574241638,0.15758419036865234,-0.06040414050221443,0.011938574723899364,-0.3573155701160431,-0.15516436100006104,0.20917752385139465,0.3518228530883789,-0.19436392188072205,-0.08605388551950455,-0.6237480640411377,0.043300263583660126,0.7203817367553711,-0.5923826694488525,-0.5509716272354126,-0.08705507963895798,0.06278406083583832,-0.07441861182451248,0.37480852007865906,0.015627099201083183,0.08303356170654297,0.41253426671028137,-0.2682530879974365,0.020816093310713768,0.07508278638124466,0.3892558515071869,-0.21733976900577545,-0.15366552770137787,-0.01365906186401844,0.05209764093160629,0.38910409808158875,0.19731050729751587,0.5996206402778625,-0.04908125102519989,-0.24849818646907806,-0.22677238285541534,0.14689423143863678,0.19113194942474365,0.3097994029521942,0.34521806240081787,0.5614162683486938,-0.6654874682426453,0.12645837664604187,0.023591946810483932,0.1768052875995636,0.3402465879917145,0.9770901799201965,-0.5036575198173523,-0.7371336221694946,-0.6150912046432495,-0.19548675417900085,-0.6102019548416138,0.16385285556316376,0.09127481281757355,0.06998312473297119,-0.2160317301750183,-0.045077502727508545,0.08523079752922058,-0.08662713319063187,0.19618463516235352,-0.3187684416770935,0.056781500577926636,0.3473345935344696,-0.2555999755859375,-0.4799078702926636,-0.2990778982639313,0.5243799686431885,-0.6373874545097351,-0.12179819494485855,-0.04105181619524956,-0.30040469765663147,0.8125637173652649,-0.1270463913679123,0.11693049222230911,-0.3279547691345215,0.39088043570518494,0.06328951567411423,-0.5886077880859375,-0.8159617185592651,0.14115360379219055,-0.24940627813339233,0.09598240256309509,-0.2752172648906708,-0.007769435178488493,-0.5147326588630676,-0.2827252745628357,0.3091681897640228,-0.27372512221336365,-0.20837756991386414,-0.258798211812973,-0.23616571724414825,0.04972850903868675,0.10040779411792755,0.22550201416015625,0.735502302646637,0.07162266224622726,0.3590991795063019,-0.6677541136741638,-0.22559423744678497,0.5151182413101196,-0.09957930445671082,-0.5142151713371277,-0.43852272629737854,-0.23516449332237244,0.14012332260608673,0.13187575340270996,-0.5823644399642944,0.04063758999109268,-0.09474147111177444,0.005438384599983692,-0.5087904930114746,0.034276749938726425,-0.09921935945749283,0.5273337364196777,0.3203457295894623,-0.3199959099292755,-0.035474807024002075,0.3508526086807251,0.18077369034290314,0.1102318987250328,-0.5949517488479614,0.24802914261817932,-0.2802303433418274,-0.34362462162971497,-0.44911178946495056,-0.09842004626989365,-0.30127543210983276,-0.40072572231292725,-0.021518513560295105,-0.22621865570545197,-0.0651240348815918,-0.41845616698265076,0.29448819160461426,-0.08634201437234879,-0.5419877171516418,0.3254770040512085,-0.08268549293279648,-0.08825672417879105,0.46885430812835693,0.46222999691963196,0.7451934218406677,-0.3562251925468445,-0.5892542004585266,0.40889623761177063,0.37730056047439575,0.8808296918869019,0.3307408392429352,0.043899573385715485,0.24987101554870605,-0.22927159070968628,0.024787215515971184,0.19600728154182434,-0.1976151466369629,-0.09394565969705582,-0.41084131598472595,-0.1880669891834259,-0.06608869135379791,0.03018658608198166,-0.4877021610736847,0.3753628432750702,-0.3994434177875519,-0.014153456315398216,0.32377827167510986,-0.2672891914844513,-0.23279468715190887,0.3525029420852661,-0.5314501523971558,-0.22670288383960724,-0.19911690056324005,-0.31146329641342163,-0.17501682043075562,-0.3155921697616577,12.504776000976562,0.06560710072517395,-0.5878119468688965,-0.13050296902656555,0.21786920726299286,-0.5330420136451721,0.0672653466463089,-0.2812455892562866,0.3228808641433716,0.22113639116287231,0.46804121136665344,-0.34107106924057007,0.3327008783817291,1.1286048889160156,-0.09475361555814743,0.8862833380699158,-0.4084217846393585,0.06949438899755478,-0.10472216457128525,0.30227944254875183,0.06674402207136154,0.0894545167684555,-0.13170816004276276,-0.9122265577316284,0.4133465588092804,0.9773066639900208,0.1863553524017334,-0.08272150903940201,-0.28514015674591064,0.021433603018522263,-1.0890523195266724,0.03287290036678314,0.35365980863571167,0.6035028696060181,0.2812871038913727,0.24996526539325714,-0.19009535014629364,-0.07944571226835251,-0.01792125403881073,0.21048124134540558,0.28649812936782837,0.34335342049598694,0.6978009343147278,-0.43389198184013367,0.055709078907966614,-0.11828672140836716,0.025764772668480873,0.11609324812889099,-0.3143024146556854,-0.2731531858444214,0.4011046886444092,0.4969868063926697,0.04202164337038994,-0.4821125268936157,-0.7171600461006165,0.011217387393116951,-0.20553579926490784,0.35625192523002625,-0.03966240584850311,0.1563633680343628,0.0008471400942653418,0.22097913920879364,-0.21063373982906342,0.0487193688750267,-0.3311101198196411,-0.45543745160102844,-0.23937927186489105,-0.06348209828138351,0.5062704682350159,0.15042045712471008,-0.14630405604839325,-0.6805256009101868,0.4591016173362732,0.17388269305229187,0.360134482383728,0.17812266945838928,-0.029496705159544945,-0.33361122012138367,-0.10898833721876144,-1.0206866264343262,0.10357116907835007,-0.03713352233171463,-0.31959909200668335,0.1893269121646881,-0.48306208848953247,0.21916578710079193,-0.0701703131198883,-0.4574168026447296,0.4436890482902527,-0.076200470328331,0.1052546575665474,-0.11630300432443619,0.11038480699062347,-0.37919965386390686,0.1321411430835724]
        }
    ]
}
```

### vectorDataField

**Supported Engines**
elasticsearch, opensearch

This field indicates the name of the field in the index that is supposed to be used in order to reorder the results using `kNN` provided by OpenSearch/ElasticSearch.

This is a **required** field in order to invoke the kNN reordering.

This field should be of type:

- `dense_vector` for ElasticSearch
- `knn_vector` for OpenSearch

| Type | Applicable on query of type | Required |
| --- | --- | --- |
| `string` | `search`, `suggestion` | false |


Following is an example of passing this field along with the `queryVector` field.

> We are assuming that the `name_vector` field is present in the index and this field is of the desired type to store vector data.


```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.1, ...]
        }
    ]
}
```

### candidates

**Supported Engines**
elasticsearch, opensearch

This indicates the number of candidates to consider while using the `script_score` functionality to reorder the results using kNN provided by ElasticSearch/OpenSearch.

| Type | Applicable on query of type | Required |
| --- | --- | --- |
| `int` | `search`, `suggestion` | false |

This field can be an integer. The default value is set to **10**.

### enableFeaturedSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

When set to `true`, featured searches are returned as suggestions as per the featured suggestions config (either defaults, or as set through [featuredSuggestionsConfig](/docs/search/reactivesearch-api/reference/#featuredsuggestionsconfig).

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### featuredSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

To define options to apply featured suggestions. It can accept the following keys:

- **featuredSuggestionsGroupId**: `string` The featured suggestions group id is required to apply the featured suggestions. A featured suggestion group is a collection of featured suggestions.
Endpoint to create a featured suggestions group: https://api.reactivesearch.io/#bdf8961b-322f-48f9-9562-c3e507fd0508

- **maxSuggestionsPerSection**: `int` To restrict the number of featured suggestions per section.

- **sectionsOrder**: `Array<string>` To define the order of sections to be displayed in UI. For e.g, `[\'document\', \'pages\', \'help\']`.


| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `suggestion`                | false    |

### enableIndexSuggestions

**Supported Engines**
elasticsearch, solr, opensearch

This property can be used to disable the index suggestions. If set the `false`, Appbase would not query the search backend to fetch the suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `bool`   | `suggestion`                | false    |

### indexSuggestionsConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify the additional options for index suggestions. It accepts following keys:

**sectionLabel**: `string` To define the section title for index suggestions.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `suggestion`                | false    |

### deepPagination

**Supported Engines**
elasticsearch, solr, opensearch

This flag tells RS whether to use the deep pagination functionality provided by the Backend to extract more than 10k results.

[More about deepPagination can be read here for ElasticSearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after)

[More about deepPagination can be read here for Solr]()

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Boolean`   | `all`                | false    |

### deepPaginationConfig

**Supported Engines**
elasticsearch, solr, opensearch

Specify the configuration for using deep pagination in the respective backend.

#### ElasticSearch

For ElasticSearch, the `deepPaginationConfig.cursor` field should contain the `sort` array\'s first element of the last `hits.hits` item.

So if `hits.hits` is of length 10, then the `deepPaginationConfig.cursor` should be the `sort` field of the 9th index item of the search result.

[More can be read about it here](https://www.elastic.co/guide/en/elasticsearch/reference/current/paginate-search-results.html#search-after)

> Note that it is important to use sorting by passing the `sortBy` and/or `sortField` value to get the `sort` field in the response.

#### Solr

For Solr, the `deepPaginationConfig.cursor` field should contain the `nextCursorMark` value received in the root of the response body in the first request.

[More can be read about it here](https://solr.apache.org/guide/6_6/pagination-of-results.html#constraints-when-using-cursors)

> Note that it is important to use sorting by passing the `sortBy` and/or `sortField` value to get the `nextCursorMark` field in the response.

| <p style="margin: 0px;" class="table-header-text">Type</p>     | <p style="margin: 0px;" class="table-header-text">Applicable on query of type</p> | <p style="margin: 0px;" class="table-header-text">Required</p> |
| ------   | --------------------------- | -------- |
| `Object`   | `all`                | false    |

### endpoint

**Supported Engines**
elasticsearch, solr, opensearch

This field indicates the backend of ReactiveSearch. Backend implies the search service being used to store the data.

As of now, the `backend` field supports the following values:

1. `elasticsearch`: ElasticSearch
2. `opensearch`: OpenSearch

where `elasticsearch` is the default value.

> This field is necessary if backend is OpenSearch and the kNN reordering of scripts are to be used.

Following example indicates how to use this field to use kNN reordering with OpenSearch as backend:

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.2],
        }
    ],
    "settings": {
        "backend": "opensearch"
    }
}
```

### includeValues

**Supported Engines**
elasticsearch, solr, opensearch


This fields indicates which values should be included in the terms aggregation (if done so). Only applied for `term` type of queries.

This should be of type array of strings:

```json
{
    "query": [{
        "includeValues": ["someterm"]
    }]
}
```

> NOTE: The string can be a regex as well but only for ElasticSearch backend, not Solr.

#### ElasticSearch

For ElasticSearch this maps to the `include` field inside the `term` query.

#### Solr

For Solr, this maps to the `facet.contains` field.

### excludeValues

**Supported Engines**
elasticsearch, solr, opensearch

This fields indicates which values should not be included in the terms aggregation (if done so). Only applied for `term` type of queries.

This should be of type array of strings:

```json
{
    "query": [{
        "excludeValues": ["someterm"]
    }]
}
```

> NOTE: The string can be a regex as well but only for ElasticSearch backend, not Solr.

#### ElasticSearch

For ElasticSearch this maps to the `exclude` field inside the `term` query.

#### Solr

For Solr, this maps to the `facet.excludeTerms` field.

### searchboxId

**Supported Engines**
elasticsearch, opensearch

## settings

**Supported Engines**
Not dependent on engine, works for all.

### recordAnalytics

**Supported Engines**
Not dependent on engine, works for all.

`bool` defaults to `false`. If `true` then it'll enable the recording of Appbase.io analytics.

### userId

**Supported Engines**
Not dependent on engine, works for all.

`String` It allows you to define the user id which will be used to record the Appbase.io analytics.

### customEvents

**Supported Engines**
Not dependent on engine, works for all.

`Object` It allows you to set the custom events which can be used to build your own analytics on top of the Appbase.io analytics. Further, these events can be used to filter the analytics stats from the Appbase.io dashboard. In the below example, we\'re setting up two custom events that will be recorded with each search request.

```js
{
    query: [...],
    settings: {
        customEvents: {
            platform: "android",
            user_segment: "paid"
        }
    }
}
```

### enableQueryRules

**Supported Engines**
Not dependent on engine, works for all.

`bool` defaults to `true`. It allows you to configure whether to apply the query rules for a particular query or not.

### enableSearchRelevancy

**Supported Engines**
Not dependent on engine, works for all.

`bool` defaults to `true`. It allows you to configure whether to apply the search relevancy or not.

### useCache

**Supported Engines**
Not dependent on engine, works for all.

`Boolean` This property when set allows you to cache the current search query. The `useCache` property takes precedence irrespective of whether caching is enabled or disabled via the dashboard.

**Try out an example in ReactiveSearch Playground**
<iframe src="https://play.reactivesearch.io/embed/LfmsZDWgTw5Zf2Z3WTR9"  style="width:100%; height:100%; border:1px solid; overflow:hidden;min-height:400px;"></iframe>

### queryRule

**Supported Engines**
Not dependent on engine, works for all.

### backend

**Supported Engines**
Not dependent on engine, works for all.

This field indicates the backend of ReactiveSearch. Backend implies the search service being used to store the data.

As of now, the `backend` field supports the following values:

1. `elasticsearch`: ElasticSearch
2. `opensearch`: OpenSearch

where `elasticsearch` is the default value.

> This field is necessary if backend is OpenSearch and the kNN reordering of scripts are to be used.

Following example indicates how to use this field to use kNN reordering with OpenSearch as backend:

```json
{
    "query": [
        {
            "value": "sudoku",
            "vectorDataField": "name_vector",
            "queryVector": [1.0, -0.2],
        }
    ],
    "settings": {
        "backend": "opensearch"
    }
}
```

**Following values are supported for this field**

`````elasticsearch`````, `````opensearch`````, `````mongodb`````, `````solr`````

## metadata

**Supported Engines**
Not dependent on engine, works for all.

