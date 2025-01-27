---
title: 'ReactiveSearch: Migration Guide'
meta_title: 'ReactiveSearch: Migration Guide'
meta_description: 'This guide will give you a brief about all the changes in the 3.x release of ReactiveSearch.'
keywords:
    - reactivesearch
    - migrationguide
    - appbase
    - elasticsearch
sidebar: 'docs'
nestedSidebar: 'web-reactivesearch'
---

ReactiveSearch and ReactiveMaps are fully compatible with React 16.6 and above with the 3.x releases. This release comes after the feedback we have gathered from the iterative deployment of reactivesearch in production for the dozens of our clients over the last year. In this version, we have changed the way certain props behave, and included new components. This guide will give you a brief about all the changes.

## ReactiveSearch

### Controlled and Uncontrolled component behaviors

To enable effective control over the components, we now support `defaultValue`, `value` & `onChange` props. These new props enable better controlled and uncontrolled usage for all the reactivesearch components. You can read all about it [here](docs/reactivesearch/v3/advanced/usage).

> We don't support `defaultSelected` prop anywhere.

### New Render Props

You can now customise the looks and behaviors of your components in much more flexible and declarative manner with the new render props added to reactivesearch components.

-   #### Result Components

In **v3**, you will need to use `renderItem` & `render` to custom render the result UI.

> We've removed rendering support with `onData` and `onAllData`. Although onData still exists to enable side-effects handling on new data transmissions. They act as callback props which gets triggered whenever there is a change in the data.

**v2.x:**

```jsx
<ReactiveList
	react={{
		and: ['CitySensor', 'SearchSensor'],
	}}
	componentId="SearchResult"
	onData={res => <div>{res.title}</div>}
/>
```

**v3.x:**

```jsx
<ReactiveList
	react={{
		and: ['CitySensor', 'SearchSensor'],
	}}
	componentId="SearchResult"
	renderItem={res => <div>{res.title}</div>}
/>
```

> Note: We have removed support for `onAllData` prop from all the result components.

We have changed the usage of `ResultList` and `ResultCard` to be more flexible in order to customize the layout. You can check more about ResultList and ResultCard [here](/docs/reactivesearch/v3/result/reactivelist/#sub-components).

**v2.x:**

```jsx
<ResultList
	componentId="SearchResult"
	dataField="original_title"
	size={3}
	onData={data => ({
		title: (
			<div
				className="book-title"
				dangerouslySetInnerHTML={{
					__html: data.original_title,
				}}
			/>
		),
		image: data.image,
		description: (
			<div className="flex column justify-space-between">
				by <span className="authors-list">{item.authors}</span>
			</div>
		),
	})}
	className="result-list-container"
	pagination
	URLParams
	react={{
		and: 'BookSensor',
	}}
/>
```

**v3.x:**

```jsx
<ReactiveList
	componentId="SearchResult"
	dataField="original_title"
	size={3}
	className="result-list-container"
	pagination
	URLParams
	react={{
		and: 'BookSensor',
	}}
	render={({ data }) => (
		<ReactiveList.ResultListWrapper>
			{data.map(item => (
				<ResultList key={item._id}>
					<ResultList.Image src={item.image} />
					<ResultList.Content>
						<ResultList.Title>
							<div
								className="book-title"
								dangerouslySetInnerHTML={{
									__html: item.original_title,
								}}
							/>
						</ResultList.Title>
						<ResultList.Description>
							<div className="flex column justify-space-between">
								by <span className="authors-list">{item.authors}</span>
							</div>
						</ResultList.Description>
					</ResultList.Content>
				</ResultList>
			))}
		</ReactiveList.ResultListWrapper>
	)}
/>
```

-   #### Error handling and rendering control

We have added the support for `renderError` in all the data driven components which can be used to display error message whenever there is an error while fetching the data for that particular component.

```jsx
<DataSearch
	componentId="SearchSensor"
	dataField={['group_venue', 'group_city']}
	renderError={error => (
		<div>
			Something went wrong with DataSearch!
			<br />
			Error details
			<br />
			{error}
		</div>
	)}
/>
```

To allow managing the side-effects on error occurrence, we also support `onError` method which gets triggered whenever an error occurs.

-   #### Search Components

In **v3**, we have added support for `parseSuggestion` & `render` to customise the rendering of suggestions in the search components. This can effectively help you render custom UI in place of vanilla suggestions. We also support `onSuggestion` prop which can be used to listen for the changes in suggestions & trigger side effects if required.

**v2.x:**

```jsx
<DataSearch
	onSuggestion={suggestion => ({
		label: (
			<div>
				{suggestion._source.original_title} by
				<span style={{ color: 'dodgerblue', marginLeft: 5 }}>
					{suggestion._source.authors}
				</span>
			</div>
		),
		value: suggestion._source.original_title,
		source: suggestion._source, // for onValueSelected to work with onSuggestion
	})}
/>
```

**v3.x:**

```jsx
<DataSearch
	parseSuggestion={suggestion => ({
		label: (
			<div>
				{suggestion._source.original_title} by
				<span style={{ color: 'dodgerblue', marginLeft: 5 }}>
					{suggestion._source.authors}
				</span>
			</div>
		),
		value: suggestion._source.original_title,
		source: suggestion._source, // for onValueSelected to work with parseSuggestion
	})}
	renderNoSuggestion={() => <div>No Suggestions for the search term!</div>}
/>
```

We also added support for `renderNoSuggestion` to give feedback to the user when there are no suggestions for a given search query. Please check the relevant search component docs for further details.

-   #### List Components

In **v3**, we have added support for `renderItem` to provide custom rendering for radio, checklist, dropdown list items UIs.

> We have removed support for `renderListItem` prop here. Use `renderItem` instead.

**v2.x**:

```jsx
<MultiList
	componentId="CitySensor"
	dataField="group.group_city.raw"
	title="Cities"
	renderListItem={(label, count) => (
		<div>
			{label}
			<span style={{ marginLeft: 5, color: 'dodgerblue' }}>{count}</span>
		</div>
	)}
/>
```

**v3.x**:

```jsx
<MultiList
	componentId="CitySensor"
	dataField="group.group_city.raw"
	title="Cities"
	renderItem={(label, count, isChecked) => (
		<div className={isChecked ? 'active' : ''}>
			{label}
			<span style={{ marginLeft: 5, color: 'dodgerblue' }}>{count}</span>
		</div>
	)}
/>
```

-   #### ReactiveComponent

In **v3** we have introduced `render` prop and have deprecated the use of Child component.

> We've removed support of `onAllData`. Although onData still exists to enable side-effects handling on new data transmissions. They act as callback props which gets triggered whenever there is a change in the data.

**v2.x**

```jsx
<ReactiveComponent
	componentId="myColorPicker"
	defaultQuery={() => ({
		aggs: {
			color: {
				terms: {
					field: 'color',
				},
			},
		},
	})}
>
	<ColorPickerWrapper />
</ReactiveComponent>
```

**v3.x**

```jsx
<ReactiveComponent
	componentId="myColorPicker"
	defaultQuery={() => ({
		aggs: {
			color: {
				terms: {
					field: 'color',
				},
			},
		},
	})}
	render={({ aggregations, setQuery }) => (
		<ColorPickerWrapper aggregations={aggregations} setQuery={setQuery} />
	)}
/>
```

### Standardized usage of custom and default queries

ReactiveSearch now internally validates the user-provided queries and compute the aggregation, sort, or generic queries based on the input provided. This intents to provide a seamless development experience to the developers for customizing the behaviors of the reactivesearch components. You can catch the details of this enhancement [here](https://github.com/appbaseio/reactivesearch/issues/546).

-   #### defaultQuery

`defaultQuery` is ideally used with data-driven components to impact their own data.

For example, in a `SingleList` component showing list of cities you may only want to render cities belonging to India.

```js
defaultQuery = {() => ({
        query: {
            terms: {
                country: [ "India" ]
            }
        }
    })
}
```

-   #### customQuery

`customQuery` is used to change the component's behavior for its subscribers. It gets triggered after an interaction on the component. Every component is shipped with a default behavior i.e. selecting a city on the SingleList component generates a term query. If you wish to change this behavior i.e. maybe perform additional query besides `term` query or do something else altogether, you can use `customQuery` prop.

```js
customQuery = {() => ({
    query: {
        term: {
                user : "Kimchy"
            }
        }
    })
}
```

## ReactiveMaps

### New Components

In **v3**, we have added support for [OpenStreetMaps](https://www.openstreetmap.org) along with [GoogleMaps](https://www.google.com/maps). To optimize the final build based on the map that you would like to integrate, we are now exporting [`ReactiveGoogleMap`](/docs/reactivesearch/v3/map/reactivegooglemap/#props) and [`ReactiveOpenStreetMap`](/docs/reactivesearch/v3/map/reactiveopenstreetmap/#props) instead of `ReactiveMap`. This helps with tree shaking, by removing unnecessary imports based on the map that you are using. Most of the props for `ReactiveGoogleMap` remains same as `ReactiveMap` from `v2`, there are few additional props introduced for `ReactiveOpenStreetMap` based on its library requirement, you can check [here](/docs/reactivesearch/v3/map/reactiveopenstreetmap/#props).

**v2**:

```js
import { ReactiveMap } from '@appbaseio/reactivemaps';

<ReactiveMap componentId="MapUI" dataField="location" title="Venue Location Map" />;
```

**v3**:

```js
import { ReactiveGoogleMap } from '@appbaseio/reactivemaps';

<ReactiveGoogleMap componentId="MapUI" dataField="location" title="Venue Location Map" />;
```

_OR_

```js
import { ReactiveOpenStreetMap } from '@appbaseio/reactivemaps';

<ReactiveOpenStreetMap componentId="MapUI" dataField="location" title="Venue Location Map" />;
```

> NOTE
>
> `GeoDistanceSlider` and `GeoDistanceDropdown` have also been updated and are now compatible with react >= v16.6. They also support same controlled and uncontrolled behaviour mentioned above in the [guide](#controlled-and-uncontrolled-component-behaviors).

ReactiveMaps 3 is published 🎉 with new features and is easier than ever to setup and use. This guide talks about what has changed in 3.0.0 and how should you as a user be switching to a 3.x stable version without breaking things.


> Behind the scenes, we have switched from using the unmaintained `react-google-maps` to a maintained rewrite in the `@react-google-maps/api` library.

### Component API changes

The following API changes apply to both [ReactiveGoogleMap](/docs/reactivesearch/v3/map/reactivegooglemap/) and [ReactiveOpenStreetMap](/docs/reactivesearch/v3/map/reactiveopenstreetmap/) components.

1. `renderAllData` changes to `render` prop.
    - before
        
        ```jsx
        
        renderAllData={(hits, loadMore, renderMap, renderPagination, triggerClickAnalytics, meta) => {        
                return(
                    <>
                        {hits.map(hit => <pre onClick={() => triggerClickAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
                        {renderMap()}
                    </>
                )
            }
        ```
        
    - after
        
        ```jsx
        render={(props) => { 
            const 
            {
                data: hits, // parsed hits
                loading,
                error,
                promotedData,
                customData,
                rawData,
                resultStats: {
                   numberOfResults
                   numberOfPages
                   currentPage
                   displayedResults
                   time
                   hidden
                   promoted
                },
                loadMore // func to load more results
                triggerClickAnalytics // to trigger click analytics
                setPage,
                renderMap // allow users to render the map component at any place
                renderPagination // allows to render pagination component after displaying results
            } = props;
            return(
                <>
                    {data.map(hit => <pre onClick={() => triggerClickAnalytics(hit._click_id)}>{JSON.stringify(hit)}</pre>)}
                    {renderMap()}
                </pre>
            )
        }
        ```
		
2. `renderData` changes to `renderItem` prop
    - before
        
        ```jsx
        renderData={result => ({
            custom: (<div>{result.mag}</div>),
        })}
        
        ```
        
    - after
        
        ```jsx
        renderItem={result => ({
            custom: (<div>{result.mag}</div>),
        })}
        ```

### Script Loading

ReactiveMaps now takes the responsibility of loding the script by itself instead of letting the user add a script tag in head of the site's html file.

Now, just pass the secret google key to the `ReactiveBase` wrapper component using `mapKey` prop and that's it. 

- before
	```html
	<html>
		<head>
			<script src="_GOOGLE_SCRIPT_LINK"></script>
		</head>
	</html>	
	```

- after
	```jsx
		<ReactiveBase
			mapKey="<YOUR_MAP_KEY>"
		>
		</ReactiveBase>
	```

Additionally, pass the `mapLibraries` prop to load additional google libraries like `places`, `visualization`, and more. The following values can be set as per the [Google Maps API Docs](https://developers.google.com/maps/documentation/javascript/libraries):
    - `drawing`
    - `geometry`
    - `localContext`
    - `places`
    - `visualization`

```jsx
<ReactiveBase
	mapKey="<YOUR_MAP_KEY>"
	mapLibraries={['visualization', 'places']}
    // ...other props
/>
```

> It's required to pass ***`mapLibraries={['places']}`*** when using either GeoDistanceDropdown or GeoDistanceSlider components from [ReactiveMaps 🗺️ ](https://docs.appbase.io/docs/reactivesearch/v3/overview/reactivemaps/).


