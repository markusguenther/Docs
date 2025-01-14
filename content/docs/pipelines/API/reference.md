---
title: 'API Reference | ReactiveSearch Pipelines'
meta_title: 'ReactiveSearch Pipelines API Reference'
meta_description: 'ReactiveSearch Pipelines API Reference. Learn about all the properties of ReactiveSearch Pipelines API'
keywords:
    - concepts
    - appbase
    - pipelines
    - api
    - reactivesearch
sidebar: 'docs'
---

This guide explains all the properties for the ReactiveSearch Pipelines API and how to use them to get the best out of the Pipelines API.



## Pipeline ID

Auto-generated unique identifier for pipeline.

## Enable Pipeline

Set as 'false' to disable a Pipeline. Defaults to 'true'.

This field can be used to disable a pipeline to test some effect or in scenarios where the pipeline might need to be disabled.

## Description

Description of pipeline.

This can be a brief explanation of what the pipeline does, this is useful for better understanding of what the pipeline is actually doing.

## Priority

In case of a conflict in pipeline routes, the pipeline with highest priority would get invoked.

Priority is an important and useful field. This can be used to set the order in which pipelines with same route can be executed when a request comes.

## Routes

**This is a required field**

Pipeline routes.

Routes is an array of route which essentially indicates which routes the pipeline will be listening to. In other words, which routes will trigger the pipeline can be defined using this field.

Following is an example of routes:

```yml
routes:
  - path: good-books-ds-pipeline/_reactivesearch
    method: POST
    classify:
      category: reactivesearch
```

Above code indicates that the pipeline will be triggered if the route is `good-books-ds-pipeline/_reactivesearch` and the method is `POST`.

### Path

**This is a required field**

Route path. For example, '/books-search'.

[More can be read about the route matching process here](/docs/pipelines/concepts/execution-process).

### Method

**This is a required field**

HTTP method for route.

This indicates the method which if it hits the route then the pipeline will be triggered.

### Record Logs

If set to 'true', then Appbase would record logs for the pipeline route. Defaults to 'false'.

### Classify Route

Useful to categorize the route. This is extremely useful to understand what kind of request is being sent through the route is suggested to be used in all pipeline definitions as ReactiveSearch way better when this is defined properly.

#### Category

**This is a required field**

Route category.

This indicates the category of the route. This is useful for the internal functioning of the pipeline.

**Following values are supported for this field**

`docs`, `search`, `indices`, `cat`, `clusters`, `misc`, `user`, `permission`, `analytics`, `streams`, `rules`, `suggestions`, `auth`, `reactivesearch`, `searchrelevancy`, `synonyms`, `searchgrader`, `uibuilder`, `logs`, `cache`, `storedquery`, `sync`, `pipelines`

#### ACL

It a sub-category of category.

This can be thought of as narrowing down the type of route. For eg, if category is the type of fruits, sub category can be type of a particular fruit. So Apple can be considered a category and Red or Green apples can be considered ACL's of Apple.

**Following values are supported for this field**

`cat`, `bulk`, `cluster`, `search`, `remote`, `create`, `count`, `scripts`, `delete`, `doc`, `source`, `field_caps`, `close`, `analyze`, `exists`, `get`, `template`, `explain`, `indices`, `alias`, `aliases`, `delete_by_query`, `cache`, `index`, `mapping`, `flush`, `forcemerge`, `upgrade`, `settings`, `open`, `recovery`, `mappings`, `rollover`, `refresh`, `segments`, `shrink`, `split`, `shard_stores`, `stats`, `ingest`, `validate`, `msearch`, `mget`, `nodes`, `mtermvectors`, `reindex`, `update_by_query`, `render`, `rank_eval`, `search_shards`, `snapshot`, `tasks`, `termvectors`, `update`

## Pipeline Environments

Useful to define custom environment variables which could be accessed by stages during pipeline execution.

[More can be read about pipeline environments here](/docs/pipelines/concepts/envs-for-stage).

## Trigger Expression

Trigger expression is to define the condition of Pipeline invocation. For example, only execute pipeline if query is 'mobile phones'. Check the documentation at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

Following is an example trigger for a pipeline that searches for mobile phones:

```yml
trigger:
  type: always
  expression: $query exactlyMatches "iphone x"
```

Above trigger will **always** run and execute the expression provided to it.

### Trigger Type

Type of trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#configure-if-condition).

**Following values are supported for this field**

`always`, `filter`, `index`, `query`, `cron`

### Trigger Expression

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

### Timeframe

To define the valid timeframe for trigger expression.

#### start_time

#### end_time

## Stages

**This is a required field**

Pipeline stages.

Stages can be thought of as steps of the pipeline that are executed (not always in the order of specification).

Following is an example of pipeline stages:

```yml

stages:
  - use: authorization
  - use: useCache
  - id: echo something
    script: "console.log('Echoing something from a JS script instead of shell!');"
  - use: reactivesearchQuery
    continueOnError: false
  - use: elasticsearchQuery
    continueOnError: false
  - use: recordAnalytics
```

Above uses some pre-built stages as well as a stage where the `script` field is used to just run some custom JavaScript. More can be read about the pre-built stages in the following section.

### Pre-built Stage

Use a pre-built stage from Appbase.

**Following values are supported for this field**

`authorization`, `elasticsearchQuery`, `reactivesearchQuery`, `useCache`, `recordAnalytics`, `promoteResults`, `hideResults`, `customData`, `replaceSearchTerm`, `addFilter`, `removeWords`, `replaceWords`, `searchRelevancy`, `kNN`, `httpRequest`, `mongoDBQuery`, `solrQuery`

### Stage Id

User-defined unique identifier for stages. It is useful to define stage dependencies using 'needs' property.

### Enabled

Set to 'false' to disable a stage. Defaults to 'true'.

### Execute Asynchronously

If set to 'true', then stage would get executed in parallel to other stages. Async stages can not modify the global 'request' and 'response' properties. Although, you can define a synchronous stage to consume the data of async stage (would be present in global context with stage id) to modify the global request/response.

### Script

Custom script to modify the request/response. You can also write custom variables to global context which can be consumed by other stages.

### Script Reference

Path to script file.

This is similar to _script_, except that it accepts a path to a file instead of an inline string. This is useful for cases where there is a very large JS script that needs to be used in one or more stages of a pipeline.

### Continue on Error

If set to 'false' and an error occurs in stage execution, then Pipeline execution would stop immediately with an error.

### Stage Inputs

Inputs required for a pre-built stage execution. The inputs structure may vary for each stage.

### Needs

Useful to define the dependencies among stages. For example, if stage 'A' depends on stages 'B' and 'C' then stage 'A' would define 'needs' property as ['B', 'C']. Stage 'A' would only get executed once the stages 'B' and 'C' are completed.

### Description

User-defined description for stage.

### Trigger

Trigger will indicate whether or not to trigger the stage.

#### Trigger Expression

Custom trigger expression. You can read more at [here](https://docs.appbase.io/docs/search/rules/#advanced-editor).

## Global Envs

Global Envs will be saved to the cluster and can be used in the pipeline. Following is an example of an env being created from the pipeline definition.

```yml
global_envs:
  - label: API Key
    key: API_KEY
    value: ***************
    description: API Key env allows setting your search engine backend\'s API key
```

Above defines a global environment which will be created when the pipeline is created and saved in the cluster.

#### What is the write behaviour

The global environment created is overwritten by default whenever a pipeline update request is sent or a new pipeline defines the same env.

It is important to understand this behaviour of the pipeline create endpoint since this can lead to unexpected affects in case two pipelines define the same global environment.

### How to access them

All global environments present in a cluster are injected into the environment context during the execution of the pipeline. This means that all the environments can be accessed through their key from the `context.envs` field.

For example, if there is a global env defined with the key `ES_URL`, it will be accessible through:

```context.envs.ES_URL```

#### Conflict Handling

There can be cases when there is global environment defined and the same key is passed in the `envs` field in the pipeline that is saved.

This means that the same key would be present in the same pipeline twice. In such cases, **the user passed values in `envs` are respected**.

This means the user passed `envs` key will be present in the `context.envs` and the global environment will not be injected into the context.

### Variable ID

Unique Identifier for the Global variable.

### Label

Name of the global variable for reference and to be shown in the UI.

### Key

Key of the global variable. This key can be used to use this global variable in the pipeline.

### Value

Value of the global variable. This can be considered the most important field of the global variable since this will contain the value of the global variable.

### Description

Description of the global variable to indicate what exactly this variable is for.

### Validate

A global environment can be validated as well, through the frontend. This adds an extra layer of check to make sure the value of the environment is what is expected and it will work as expected in the pipeline.

The validation details can be passed with the `validate` field inside the global environment field in the pipeline file.

Validation is essentially a sophisticated **fetch** request where we also check if the response status code matches the one that the user specifies.

### Example: Validate an index

Following example explains how the `validate` field can be used to verify that an index exists:

```yml
global_envs:
  - label: Index
    key: INDEX
    value: some_index
    description: A valid Elasticsearch index
    validate:
      url: http://localhost:9200/${INDEX}
      expected_status: 200
```

Above syntax will ensure that the env is validated before it is created. The URL `http://localhost:9200/${{INDEX}}` will resolve to the following and will be hit with a `GET` request.

Above will resolve to the following cURL request where if the `expected_status` is same as the got status, it is considered.

```sh
curl -X GET http://localhost:9200/some_index
```

#### url

The `url` field is used to specify the URL that is supposed to be hit during validating the global environment before adding it.

#### method

It might be important to specify the method field in order to get the `expected_status`. This can be done by passing the method as a string. By default the value is set to `GET`.

Some of the other valid options are:

- `POST`
- `PUT`
- `PATCH`

#### body

At times, there might be the need to pass the body in a response in order to get the `expected_status`. This is also supported by passing the body in the `body` field.

The body should be passed as a **string**. If JSON, this should be a stringified JSON.

#### headers

Headers can be essential to alter the response recieved from hitting a particular URL. Headers can be passed during validating by using the `headers` field.

For eg, a `Content-Type` header can be passed in the following way:

```yml
global_envs:
  - label: ES URL
    key: ES_URL
    value: http://localhost:9200
    validate:
      headers:
        "Content-Type": "application/json"
```

#### expected_status

The `expected_status` field is used to make sure the validation was succesfull. It is an integer that should match the status code of the validate request when it is successfull.

### created_at

### updated_at

