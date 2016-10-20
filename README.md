# http-mock
Lightweight XHTTPRequest Mock for testing Javascript applications

## Usage

The following code will initialize `HttpMock` with 3 mappings:

```html
<script src="http-mock.js"></script>
<script>
    new HttpMock({
        pattern: '/example/path/to/replace',
        file: 'mock.json'
    },
    {
        pattern: 'another/example.php',
        params: {
            responseText: 'mocked response text'
        }
    },
    {
        pattern: '.*',
        params: {
            status: 404,
            responseText: 'not found'
        }
    });
</script>
```
## Parameters

| Param   | Description                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| pattern | regular expression to test path against; if it matches then request will be processed                      |
| matcher | `function` that returns `true` if request matches its mock                                                 |
| file    | path where request will be redirected                                                                      |
| params  | `Object` containing parameters such as `status`, `responseText` which will replace existing ones as a mock |
