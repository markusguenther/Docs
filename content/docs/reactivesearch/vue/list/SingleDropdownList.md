---
title: 'SingleDropdownList'
meta_title: 'SingleDropdownList'
meta_description: '`SingleDropdownList` creates a dropdown list based single select UI component.'
keywords:
    - reactivesearch
    - singledropdownlist
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/B2FPkeH.png)

`SingleDropdownList` creates a dropdown list based single select UI component. It is used for filtering results based on the current selection from a list of items.

> Note
>
> This component is exactly like the [SingleList](/docs/reactivesearch/vue/list/SingleList/) component except the UI is based on a dropdown, ideal for showing additional UI filters while conserving screen space.

Example uses:

-   select a category from a list of categories for filtering e-commerce search results.
-   filtering restaurants by a cuisine choice.

## Usage

### Basic Usage

```html
<template>
	<single-dropdown-list
		componentId="CitySensor"
		dataField="group.group_city.raw"
		title="Cities"
	/>
</template>
```

### Usage With All Props

```html
<single-dropdown-list
    componentId="CitySensor"
    dataField="group.group_city.raw"
    title="Cities"
    sortBy="count"
    defaultValue="London"
    placeholder="Search City"
    selectAllLabel="All Cities"
    filterLabel="City"
    :showCount="true"
    :react="{ and: ['CategoryFilter', 'SearchFilter'] }"
    :size="100"
    :showFilter="true"
    :URLParams="false"
    :endpoint="{
        url:'https://appbase-demo-ansible-abxiydt-arc.searchbase.io/recipes-demo/_reactivesearch.v3',
        headers: {
            // put relevant headers
        },
        method: 'POST'
    }"    
/>
```

## Props

-   **componentId** `String`
    unique identifier of the component, can be referenced in other components' `react` prop.
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
    data field to be connected to the component's UI view. This field is used for doing an aggregation and returns the result. We're using a `.raw` multifield here. You can use a field of type `keyword` or `not_analyzed` depending on your Elasticsearch cluster.
-   **nestedField** `String` [optional]
    use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
-   **title** `String or JSX` [optional]
    title of the component to be shown in the UI.
-   **size** `Number` [optional]
    number of list items to be displayed.

    > Note: 
    > 1. Appbase users should use the `aggregationSize` prop instead. The `size` prop would only set the size for `hits` not the `aggregations`.
    > 2. We recommend Appbase users to not use the `size` prop unless they are using `hits` because it can impact the query performance.

-   **aggregationSize**
    To set the number of buckets to be returned by aggregations.

    > Note: This prop is only applicable when `enableAppbase` is set to `true`.
-   **sortBy** `String` [optional]
    property that decides on how to sort the list items, accepts one of `count`, `asc` or `desc` as valid values. `count` sorts the list based on the count occurences, with highest value at the top. `asc` sorts the list in the ascending order of the list item (Alphabetical). `desc` sorts the list in the descending order of the term. Defaulted to `count`.
-   **defaultValue** `string` [optional]
    default selected value pre-selects an option from the list.
-   **value** `String` [optional]
    sets the current value of the component. It sets the value (on mount and on update). Use this prop in conjunction with the `change` event.	    
-   **showCount** `Boolean` [optional]
    show count of number of occurences besides an item. Defaults to `true`.
-   **showSearch** `Boolean` [optional]
    whether to show a searchbox to filter the list items locally. Defaults to false.
-   **showClear** `Boolean` [optional]
    whether to show a clear button to clear the entered text in the searchbox. Defaults to `false`.    
-   **renderItem** `Function|slot-scope` [optional]
    customize the rendered list via a function or slot-scope which receives the item label, count and isChecked & expects a JSX or String back. For example:

<!-- prettier-ignore -->
```html
<single-dropdown-list>
	<div
        slot="renderItem"
        slot-scope="{ label, count }"
    >
		{{label}}
		<span :style="{ marginLeft: 5, color: 'dodgerblue' }">
			{{count}}
		</span>
	</div>
</single-dropdown-list>
```

-   **renderError** `String|Function|slot-scope` [optional]
    can be used to render an error message in case of any error.

<!-- prettier-ignore -->
```html
<template
    slot="renderError"
    slot-scope="error"
>
	<div>Something went wrong!<br />Error details<br />{{ error }}</div>
</template>
```

-   **showMissing** `Boolean` [optional]
    defaults to `false`. When set to `true` it also retrives the aggregations for missing fields under the label specified by `missingLabel`.
-   **missingLabel** `String` [optional]
    defaults to `N/A`. Specify a custom label to show when `showMissing` is set to `true`.
-   **placeholder** `String` [optional]
    placeholder to be displayed in the dropdown searchbox.
-   **selectAllLabel** `String` [optional]
    if provided, shows an extra option to select all the options in the list with the provided string value.
-   **showFilter** `Boolean` [optional]
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
-   **filterLabel** `String` [optional]
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
-   **URLParams** `Boolean` [optional]
    enable creating a URL query string parameter based on the selected value of the list. This is useful for sharing URLs with the component state. Defaults to `false`.
-   **render** `Function|slot-scope` [optional]
    an alternative callback function to `renderItem`, where user can define how to render the view based on all the data changes.
    <br/>
    It accepts an object with these properties:
    -   **`loading`**: `boolean`
        indicates that the query is still in progress
    -   **`error`**: `object`
        An object containing the error info
    -   **`data`**: `array`
        An array of results obtained from the applied query.
    -   **`rawData`** `object`
        An object of raw response as-is from elasticsearch query.
    -   **`value`**: `array`
        current selected values.
    -   **`handleChange`**: `function`
        A callback function can be used to mark the list value as selected.
    -   **`downshiftProps`**: `object`
        provides the following control props from `downshift` which can be used to bind list items with click/mouse events.
        -   **isOpen** `boolean`
            Whether the menu should be considered open or closed. Some aspects of the downshift component respond differently based on this value (for example, if isOpen is true when the user hits "Enter" on the input field, then the item at the highlightedIndex item is selected).
        -   **getItemProps** `function`
            Returns the props you should apply to any menu item elements you render.
        -   **getItemEvents** `function`
            Returns the events you should apply to any menu item elements you render.
        -   **highlightedIndex** `number`
            The index that should be highlighted.

You can use render as a slot as shown below:

<!-- prettier-ignore -->
```html
<single-dropdown-list
    :showSearch="false"
    componentId="BookSensor"
    data-field="original_series.raw"
>
	<div
		class="suggestions"
		slot="render"
		slot-scope="{ data, handleChange, downshiftProps: { isOpen } }"
	>
		<ul v-if="isOpen">
			<li
				style="{ background-color: highlightedIndex ? 'grey' : 'transparent' }"
				v-for="suggestion in (data || [])"
				:key="suggestion._id"
				v-on:click="handleChange(suggestion.key)"
			>
				{{ suggestion.key }}
			</li>
		</ul>
	</div>
</single-dropdown-list>
```

-   **renderLabel** `Function|slot-scope` [optional]
    can be used to change the label of the dropdown. Useful for adding highlighting/styling to or translating the label.

    <!-- prettier-ignore -->
    ```html
    <single-dropdown-list>
        <div
            slot="renderLabel"
            slot-scope="item"
        >
            <div style="{ fontSize: '15px', fontColor: 'blue' }">
                {{item}}}
            </div>
        </div>
    </single-dropdown-list>
    ```

-   **showLoadMore** `Boolean` [optional]
    defaults to `false` and works only with elasticsearch >= 6 since it uses [composite aggregations](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-composite-aggregation.html). This adds a "Load More" button to load the aggs on demand combined with the `size` prop. Composite aggregations are in beta and this is an experimental API which might change in a future release.

-   **isOpen** `Boolean` [optional] When set to `true` the dropdown is displayed on the initial render. Defaults to `false`.
## Demo

<br/>
<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/single-dropdown-list" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`SingleDropdownList` component supports `innerClass` prop with the following keys:

-   `title`
-   `select`
-   `list`
-   `icon`
-   `count`

Read more about it [here](/docs/reactivesearch/vue/theming/ClassnameInjection/).

## Extending

`SingleDropdownList` component can be extended to

1. customize the look and feel with `className`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `value-change` and `query-change`,
4. specify how options should be filtered or updated using `react` prop.

```html
<template>
	<single-dropdown-list
		className="custom-class"
		:customQuery="getCustomQuery"
		:react="react"
		:beforeValueChange="handleBeforeValueChange"
		@value-change="handleValueChange"
		@query-change="handleQueryChange"
	/>
</template>
<script>
	export default {
		name: 'app',
		methods: {
			getCustomQuery: (value, props) => {
				return {
					query: {
						match: {
							data_field: 'this is a test',
						},
					},
				};
			},
			handleBeforeValueChange: value => {
				// called before the value is set
				// returns a promise
				return new Promise((resolve, reject) => {
					// update state or component props
					resolve();
					// or reject()
				});
			},
			handleValueChange: value => {
				console.log('current value: ', value);
				// set the state
				// use the value with other js code
			},
			handleQueryChange: (prevQuery, nextQuery) => {
				// use the query with other js code
				console.log('prevQuery', prevQuery);
				console.log('nextQuery', nextQuery);
			},
		},
		computed: {
			react() {
				return {
					and: ['pricingFilter', 'dateFilter'],
					or: ['searchFilter'],
				};
			},
		},
	};
</script>
```

-   **className** `String`
    CSS class to be injected on the component container.
-   **customQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the component, as defined in Elasticsearch Query DSL.
    `Note:` customQuery is called on value changes in the **SingleDropdownList** component as long as the component is a part of `react` dependency of at least one other component.
-   **defaultQuery** `Function`
    takes **value** and **props** as parameters and **returns** the data query to be applied to the source component, as defined in Elasticsearch Query DSL.
    `Note:` defaultQuery doesn't get leaked to other components.
-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

    > Note:
    >
    > If you're using Reactivesearch version >= `1.1.0`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

    ```js
    beforeValueChange = value => {
    	// The update is accepted by default
    	if (value === 'Dirk Pitt') {
    		// To reject the update, throw an error
    		throw Error('Selected value should not be equal to Dirk Pitt.');
    	}
    };
    ```

-   **renderNoResults** `String|Function|slot-scope` [optional]
    show custom message or component when no results found.

<!-- prettier-ignore -->
```html
<template
    slot="renderNoResults"
>
	<h4>No Results Found!</h4>
</template>

<!-- or -->

<single-dropdown-list
	...
	:renderNoResults="renderNoResults"
/>

export default {
	...,
	method: {
		renderNoResults() {
			return 'Try Again';
		}
	},
}

```

-   **transformData** `Function` [optional]
    allows transforming the data to render inside the list. You can change the order, remove, or add items, tranform their values with this method. It provides the data as param which is an array of objects of shape `{ key: <string>, doc_count: <number> }` and expects you to return the array of objects of same shape.
-   **react** `Object`
    specify dependent components to reactively update **SingleDropdownList's** options.
    -   **key** `String`
        one of `and`, `or`, `not` defines the combining clause.
        -   **and** clause implies that the results will be filtered by matches from **all** of the associated component states.
        -   **or** clause implies that the results will be filtered by matches from **at least one** of the associated component states.
        -   **not** clause implies that the results will be filtered by an **inverse** match of the associated component states.
    -   **value** `String or Array or Object`
        -   `String` is used for specifying a single component by its `componentId`.
        -   `Array` is used for specifying multiple components by their `componentId`.
        -   `Object` is used for nesting other key clauses.
-   **index** `String` [optional]
    The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

    > Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Events

- **change**
  is an event that accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This event is useful to control the value updates of search input.

  ```jsx
  <template>
      <single-dropdown-list
	      // ...other props
          value="value"
          @change="handleChange"
      />
  </template>

  <script>
  export default {
    name: 'app',
      data() {
          return {
              value: ""
          }
      },
      methods: {
          handleChange(value) {
              this.value = value;
          }
      }
  };
  </script>
  ```

-   **query-change**
    is an event which accepts component's **prevQuery** and **nextQuery** as parameters. It is called everytime the component's query changes. This event is handy in cases where you want to generate a side-effect whenever the component's query would change.
-   **value-change**
    is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when a list item is selected in a "Discounted Price" SingleList.

-   **error**
    gets triggered in case of an error and provides the `error` object, which can be used for debugging or giving feedback to the user if needed.
