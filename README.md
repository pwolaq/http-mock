# http-mock
Lightweight XHTTPRequest Mock for testing Javascript applications

## Usage

The following code will initialize `httpMock` with 3 mappings:

```html
<script src="http-mock.js"></script>
<script>
    new httpMock([
        {
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
        }
    ]);
</script>
```
## Parameters
```javascript
{
    pattern: String,
    file: String
}
```
or
```javascript
{
    pattern: String,
    params: Object
}
```
| Param   | Description                                                                                                |
| ------- | ---------------------------------------------------------------------------------------------------------- |
| pattern | regular expression to test path against; if it matches then request will be processed                      |
| file    | path where request will be redirected                                                                      |
| params  | `Object` containing parameters such as `status`, `responseText` which will replace existing ones as a mock |
