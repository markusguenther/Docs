---
title: 'SingleRange'
meta_title: 'SingleRange'
meta_description: '`SingleRange` creates a numeric range selector UI component that is connected to a database field.'
keywords:
    - reactivesearch
    - singlerange
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'vue-reactivesearch'
---

![Image to be displayed](https://i.imgur.com/d6u5asg.png)

`SingleRange` creates a numeric range selector UI component that is connected to a database field.

> Note
>
> It is similar to a [SingleList](/docs/reactivesearch/vue/list/SingleList/), except it is suited for numeric data.

Example uses:

-   filtering search results by prices in an e-commerce or food delivery experience.
-   browsing a movies listing site using a ratings filter.

## Usage

### Basic Usage

```html
<template>
	<single-range
		title="Prices"
		componentId="PriceSensor"
		dataField="price"
		:data="
            [{'start': 0, 'end': 10, 'label': 'Cheap'},
            {'start': 11, 'end': 20, 'label': 'Moderate'},
            {'start': 21, 'end': 50, 'label': 'Pricey'},
            {'start': 51, 'end': 1000, 'label': 'First Date'}]
        "
	/>
</template>
```

### Usage With All Props

```html
<template>
	<single-range
		componentId="PriceSensor"
		dataField="price"
		title="Prices"
		defaultValue="Cheap"
		filterLabel="Price"
		:data="
			[{'start': 0, 'end': 10, 'label': 'Cheap'},
			 {'start': 11, 'end': 20, 'label': 'Moderate'},
			 {'start': 21, 'end': 50, 'label': 'Pricey'},
			 {'start': 51, 'end': 1000, 'label': 'First Date'}]
		"
		:showRadio="true"
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
</template>
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
    data field to be connected to the component's UI view. The range items are filtered by a database query on this field.
-   **data** `Object Array`
    collection of UI `labels` with associated `start` and `end` range values.
-   **nestedField** `String` [optional]
    use to set the `nested` mapping field that allows arrays of objects to be indexed in a way that they can be queried independently of each other. Applicable only when dataField is a part of `nested` type.
-   **title** `String or JSX` [optional]
    title of the component to be shown in the UI.
-   **defaultValue** `String` [optional]
    pre-select a label from the `data` array.
-   **value** `String` [optional]
    sets the current value of the component. It sets the value (on mount and on update). Use this prop in conjunction with the `change` event.	
-   **showRadio** `Boolean` [optional]
    show radio button icon for each range item. Defaults to `true`.
-   **showFilter** `Boolean` [optional]
    show as filter when a value is selected in a global selected filters view. Defaults to `true`.
-   **filterLabel** `String` [optional]
    An optional label to display for the component in the global selected filters view. This is only applicable if `showFilter` is enabled. Default value used here is `componentId`.
-   **URLParams** `Boolean` [optional]
    enable creating a URL query string parameter based on the selected value of the range. This is useful for sharing URLs with the component state. Defaults to `false`.
-   **index** `String` [optional]
    The index prop can be used to explicitly specify an index to query against for this component. It is suitable for use-cases where you want to fetch results from more than one index in a single ReactiveSearch API request. The default value for the index is set to the `app` prop defined in the ReactiveBase component.

    > Note: This only works when `enableAppbase` prop is set to true in `ReactiveBase`.

## Demo

<br />

<iframe src="https://codesandbox.io/embed/github/appbaseio/reactivesearch/tree/next/packages/vue/examples/single-range" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Styles

`SingleRange` component supports `innerClass` prop with the following keys:

-   `title`
-   `list`
-   `radio`
-   `label`

Read more about it [here](/docs/reactivesearch/vue/theming/ClassnameInjection/).

## Extending

`SingleRange` component can be extended to

1. customize the look and feel with `className`, `style`,
2. update the underlying DB query with `customQuery`,
3. connect with external interfaces using `beforeValueChange`, `value-change` and `query-change`.

```html
<template>
	<single-range
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
    `Note:` customQuery is called on value changes in the **SingleRange** component as long as the component is a part of `react` dependency of at least one other component.
-   **beforeValueChange** `Function`
    is a callback function which accepts component's future **value** as a parameter and **returns** a promise. It is called everytime before a component's value changes. The promise, if and when resolved, triggers the execution of the component's query and if rejected, kills the query execution. This method can act as a gatekeeper for query execution, since it only executes the query after the provided promise has been resolved.

    > Note:
    >
    > If you're using Reactivesearch version >= `1.1.0`, `beforeValueChange` can also be defined as a synchronous function. `value` is updated by default, unless you throw an `Error` to reject the update. For example:

    ```js
    beforeValueChange = value => {
    	// The update is accepted by default
    	if (value.start < 4) {
    		// To reject the update, throw an error
    		throw Error('Rating must be greater than or equal to 4.');
    	}
    };
    ```

## Events

- **change**
  is an event that accepts component's current **value** as a parameter. It is called when you are using the `value` prop and the component's value changes. This event is useful to control the value updates of search input.

  ```jsx
  <template>
      <single-range
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
    is an event which accepts component's current **value** as a parameter. It is called everytime the component's value changes. This event is handy in cases where you want to generate a side-effect on value selection. For example: You want to show a pop-up modal with the valid discount coupon code when range item(s) is/are selected in a "Discounted Price" SingleRange.

## Examples

<a href="https://reactivesearch-vue-playground.netlify.com/?selectedKind=Range%20Components%2FSingleRange&selectedStory=Basic&full=0&addons=1&stories=1&panelRight=0" target="_blank">SingleRange with default props</a>
