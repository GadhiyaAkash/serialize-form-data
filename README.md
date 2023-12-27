# serialize-form-data

[![npm version](https://badge.fury.io/js/serialize-form-data.svg)](https://badge.fury.io/js/serialize-form-data)

The serialize-form-data is a plugin that allows you to easily serialize form data and send it to a server using AJAX. The serialize-form-data can handle multiple input types, including text, checkbox, radio, select, and hidden fields. The serialize-form-data also supports nested objects and arrays, as well as custom data attributes.

## Installation

To use serialize-form-data, you need to install in your project. You can install the plugin from https://www.npmjs.com/package/serialize-form-data.

Run `npm i serialize-form-data`

## Usage

To use `serialize-form-data`, you need to have a form element in your HTML page, with a unique id or name attribute. For example:
Lets serialize the following html form:

```html
<form id="login-form">
	<input type="text" name="username" value="admin"/>
	<button type="submit">Login</button>
</form>
```

To serialize the form data and send it to a server using AJAX, you need to call the serialize method on the form element. For example:

```js
import serializeFormData from "serialize-form-data";
var form = document.querySelector('#login-form');

var string = serializeFormData.serialize(form);
// string -> "username=admin"

var objectData = serialize(form, { hash: true });
// objectData -> { username: 'admin' }
```

It supports two output formats, url encoded (default) or hash (js objects).

## License

The serialize-form-data is licensed under the MIT License. See the LICENSE file for details. (https://github.com/GadhiyaAkash/serialize-form-data/blob/main/LICENSE)
