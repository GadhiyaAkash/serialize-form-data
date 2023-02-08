## What is this?
Serialize form fields to submit a form over ajax

## Installation

Run `npm i serialize-form-data`

## Use

`serialize-form-data` supports two output formats, url encoded (default) or hash (js objects)

Lets serialize the following html form:

```html
<form id="login-form">
	<input type="text" name="username" value="admin"/>
	<button type="submit">Login</button>
</form>
```

```js
var serialize = require('serialize-form-data');
var form = document.querySelector('#login-form');

var string = serialize(form);
// string -> "username=admin"

var objectData = serialize(form, { hash: true });
// objectData -> { username: 'admin' }
```

## license

MIT