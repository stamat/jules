var a = 4, 
	b = 'you@example.com', 
	c = [1,2,3,4], 
	d = [1,2,'f', 4],
	e = {foo:1, bar: 'baz'},
	f = {foo:1, bar: 'baz', qux: true};

var schema1 = {
	"type": "integer",
	"minimum": 1,
	"maximum": 5,
	"exclusiveMaximum": true,
	"enum": [1,2,3,4]
},

schema2 = {
	"type": "string",
	"format": "email",
	"minLength" : 8,
	"maxLength" : 64
},

schema3 = {
	"type": ["integer","string"],
	"format": "email",
	"minLength" : 8,
	"maxLength" : 64,
	"minimum": 1,
	"maximum": 5,
	"multipleOf": 2,
	"exclusiveMaximum": true,
	"oneOf":[{"type":"integer", "enum": [1,2,3,4]},
		{"type":"string", "pattern": "\.com"}]
},

schema4 = {
	"definitions": {
		"someIntegers": {
			"type": "integer",
			"minimum": 1,
			"maximum": 5,
			"exclusiveMaximum": true,
			"enum": [1,2,3,4]
		}
	},
	"type": ["array"],
	"maxItems" : 16,
	"uniqueItems": true,
	"items":{
		"$ref":"#definitions/someIntegers"
	}
},

schema5 = {
	"type": ["array"],
	"maxItems" : 16,
	"uniqueItems": true,
	"items":[schema1, schema1, {
		"type": "string",
		"maxLength": 1,
		"pattern": "f"
	}, schema1],
	
	"additionalItems": false
},

schema6 = {
	"definitions": {
		"someIntegers": schema1
	},
	"type": "object",
	"maxProperties" : 2,
	"properties": {
		"foo": {
			"$ref":"#definitions/someIntegers"
		}
	},
	"patternProperties": {
		"^ba[a-z]+": {
			"type": "string",
			"maxLength": 3
		}
	},
	"dependencies": {
		"foo": ["bar"]
	},
	"additionalProperties": false
},

schema7 = JSON.parse(JSON.stringify(schema6)); //clone
schema7.maxProperties = 3;
schema7.additionalProperties = {"type": "boolean"};

function echo(msg) {
	var elem = document.createElement('p');
	elem.innerHTML = msg;
	document.body.appendChild(elem);
}

//TEST
echo('Validate `a` against `schema 1`: '+ jules.validate(a, schema1)); //true

echo('Validate `b` against `schema 2`: '+ jules.validate(b, schema2)); //true

echo('Validate `a` against `schema 3`: '+ jules.validate(a, schema3)); //true

echo('Validate `b` against `schema 3`: '+ jules.validate(b, schema3)); //true

echo('Validate `c` against `schema 4`: '+ jules.validate(c, schema4)); //true

echo('Validate `d` against `schema 4`: '+ jules.validate(d, schema4)); //false

echo('Validate `d` against `schema 5`: '+ jules.validate(d, schema5)); //true

echo('Validate `e` against `schema 6`: '+ jules.validate(e, schema6)); //true

echo('Validate `f` against `schema 6`: '+ jules.validate(f, schema6)); //false

echo('Validate `f` against `schema 7`: '+ jules.validate(f, schema7)); //true