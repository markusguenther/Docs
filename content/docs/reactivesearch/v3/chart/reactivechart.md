---
title: 'ReactiveChart'
meta_title: 'ReactiveChart'
meta_description: '`ReactiveChart` creates chart UI connected to a database field.'
keywords:
    - reactivesearch
    - reactivechart
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/rKeZW0V.png)

`ReactiveChart` is a generic component to render any chart UI supported by [Echarts](https://echarts.apache.org/). It is connected to a database field in search backend to retrieve chart data.

Example uses:

-   A histogram chart to display the price distribution in an e-commerce app, range selection can filter the products 
-   A pie chart to show the language distribution for a book store app, section selection can filter the books

## Usage

### Basic Usage

```jsx
    <ReactiveChart
        // pre-built chart type
        chartType="pie"
        // unique id for component
        componentId="language"
        // Database field to connect
        dataField="language_code.keyword"
        // Chart title
        title="Languages"
    />
```

### Usage With All Props

```jsx
    <ReactiveChart
        componentId="Language"
        dataField="language_code.keyword"
        chartType="pie"
        title="Languages"
        size={100}
        index="good-books-ds"
        sortBy="count"
        react={{
            and: ['SearchFilter'],
        }}
        useAsFilter={true}
        showFilter={true}
        filterLabel="Language"
        URLParams
        loader="Loading ..."
        range={{
            start: 1900,
            end: 2000
        }}
        labelFormatter={value => `${value} USD`}
	    xAxisName="language"
	    yAxisName="count"
	    xAxisField="language"
	    yAxisField="language_count"
        renderError={error => <div>Something went wrong! {error}</div>}
        // event callbacks
        onClick={(item) => {}}
        onDblClick={(item) => {}}
        onMouseDown={(item) => {}}
        onMouseUp={(item) => {}}
        onMouseMove={(item) => {}}
        onMouseOut={(item) => {}}
        onGlobalOut={(item) => {}}
        onContextMenu={(item) => {}}
        onError={(error) => {}}
        endpoint={{
          url:"https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3", //mandatory
          headers:{
            // relevant headers
          },
          method: 'POST'
        }}            
    />
```

## Props

-   **componentId** `String`

    unique identifier of the component, can be referenced in other components' `react` prop.
    <br />

-   **endpoint** `Object` [optional] 
    endpoint prop provides the ability to query a user-defined backend service for this component, overriding the data endpoint configured in the ReactiveBase component. Works only when `enableAppbase` is `true`.
    Accepts the following properties:
    -   **url** `String` [Required]
        URL where the data cluster is hosted.
    -   **headers** `Object` [optional]        
        set custom headers to be sent with each server request as key/value pairs.
    -   **method** `String` [optional]    
        set method of the API request.
    -   **body** `Object` [optional]    
        request body of the API request. When body isn't set and method is POST, the request body is set based on the component's configured props.

    > - Overrides the endpoint property defined in ReactiveBase.
    > - If required, use `transformResponse` prop to transform response in component-consumable format.

-   **dataField** `String`

    data field to be connected to the component's UI view. The chart data is filtered by a database query on this field. This field is used for doing an aggregation and returns the result.

-   **chartType** `String`

    Pre-built chart types supported by `ReactiveChart`. Valid options are: `pie`, `line`, `bar`, `histogram` and `chart`.

-   **nestedField** `String` [optional]

    use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.

-   **title** `String or JSX` [optional]

    title of the component to be shown in the UI.

-   **loader** `String or JSX` [optional]

    to display an optional loader while fetching the options.

-   **size** `Number` [optional]
    number of items to be displayed.

    > Note: 
    > 1. Appbase users should use the `aggregationSize` prop instead. The `size` prop would only set the size for `hits` not the `aggregations`.
    > 2. We recommend Appbase users to not use the `size` prop unless they are using `hits` because it can impact the query performance.

-   **aggregationSize**
    To set the number of buckets to be returned by aggregations.

    > Note: This prop is only applicable when `enableAppbase` is set to `true`.

-   **sortBy** `String` [optional]

    sort the items by one of `count`, `asc`, `desc`. Defaults to `count`, which sorts the by the frequency of count value, most first.

-   **showMissing** `Boolean` [optional]

    defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by `missingLabel`.

-   **missingLabel** `String` [optional]

    defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.

-   **showFilter** `Boolean` [optional]

    show as filter when a value is selected in a global selected filters view. Defaults to `true`.

-   **filterLabel** `String` [optional]

    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.

-   **URLParams** `Boolean` [optional]

    enable creating a URL query string parameter based on the selected value of the chart. This is useful for sharing URLs with the component state. Defaults to `false`.

-   **renderError** `String or JSX or Function` [optional]
    can be used to render an error message in case of any error.
    ```jsx
        renderError={(error) => (
                <div>
                    Something went wrong!<br/>Error details<br/>{error}
                </div>
            )
        }
    ```
-   **value** `string` [optional]
    controls the current value of the component. It selects the item from the chart UI (on mount and on update). Use this prop in conjunction with `onChange` function.

-   **onChange** `function` [optional]
    is a callback function which accepts component's current **value** as a parameter. It is called when you are using the `value` props and the component's value changes. This prop is used to implement the [controlled component](https://reactjs.org/docs/forms/#controlled-components) behavior.

-   **onError** `Function` [optional]
    gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.

-   **index** `String` [optional]
    The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

    > Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

-   **xAxisName** `String` [optional]
    Label for x axis line
-   **yAxisName** `String` [optional]
    Label for y axis line
-   **xAxisField** `String` [optional]
    Field name to extract the x axis data for scatter chart
-   **yAxisField** `String` [optional]
    Field name to extract the y axis data for scatter chart
-   **labelFormatter** `Function` [optional]
    To customize the range labels, for example:
```js
    labelFormatter=(value)=>`${value} USD`
```
-   **range** `Object`
    an object with `start` and `end` keys and corresponding numeric values denoting the minimum and maximum possible slider values.
    
    `range` prop accepts `Date` objects as values corresponding to `start` and `end` keys when date-types are dealt with.

```js
    <ReactiveChart
        componentId="RangeSliderSensor"
        chartType="histogram"
        dataField="timestamp"
        title="Publication Year"
        range={{
            start: new Date('1980-12-12'),
            end: new Date('2000-12-12')
        }}
        queryFormat="date"            
    />
```
-   **interval** `Number` [optional]
    set the histogram bar interval, applicable when _showHistogram_ is `true`. Defaults to `Math.ceil((props.range.end - props.range.start) / 100) || 1`.

-   **includeNullValues** `Boolean` [optional]
    If you have sparse data or document or items not having the value in the specified field or mapping, then this prop enables you to show that data. Defaults to `false`.

-   **useAsFilter** `Boolean` [optional]
    If set to `false` then data selection on chart UI would not filter the results. Defaults to `true`.
## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/web/examples/ReactiveChart/Pie" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Extending

`ReactiveChart` component can be extended to

1. Customize the chart UI using `setOption`,
2. update the underlying DB query with `customQuery`, `defaultQuery`,
3. specify how options should be filtered or updated using `react` prop.

```jsx
    <ReactiveChart
        // To customize the query to fetch chart data
        defaultQuery={(value, props) => ({
            "aggs": {
                "language_code": {
                    "terms": {
                        "field": "language_code"
                    }
                }
            }
        })}
         // To customize the query to filter results based on value selection
        customQuery={(value, props) => ({
            "query": {
                "term": {
                    [props.dataField]: value
                }
            }
        })}
        // Customize the chart UI, set custom echart option
        setOption={({ aggregationData }) => ({
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: aggregationData.map(item => ({
                        value: item.doc_count,
                        name: item.key,
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        })}
        // specify how and which options are filtered using `react` prop.
        react={
            "and": ["pricingFilter", "dateFilter"],
            "or": ["searchFilter"]
        }
    />
```

-   **customQuery** `Function`
    is a callback function which accepts component's current **value** as a parameter and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
    `Note:` customQuery is called on value changes in the **ReactiveChart** component as long as the component is a part of `react` dependency of at least one other component.
-   **defaultQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL, which doesn't get leaked to other components.
    Read more about it [here](/docs/reactivesearch/v3/advanced/customqueries/#when-to-use-default-query).
-   **setOption** `Function`
    `ReactiveChart` uses the [Echarts](https://echarts.apache.org/) library to render the UI. `ReactiveChart` component connects the search backend to retrieve the chart data. The `setOption` prop allows you to define the custom chart option support by [Echarts](https://echarts.apache.org/) to render any kind of chart UI. It accepts the an object containing the following properties:
    - `aggregationData` An array of aggregation buckets
    - `data` An array of search hits
    - `rawData` Search backend data in raw form
    - `value` Current selected value in chart UI
    For example,
    ```js
        setOption={({ data, aggregationData, rawData, value }) => ({
            title: {
                text: "Languages"
            },
            tooltip: {
                trigger: 'item',
            },
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: '50%',
                    data: aggregationData.map(item => ({
                        value: item.doc_count,
                        name: item.key,
                    })),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)',
                        },
                    },
                },
            ],
        })}
    ```
-   **react** `Object`
    specify dependent components to reactively update **ReactiveChart's** options.
    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.
