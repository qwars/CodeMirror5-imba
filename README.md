# CodeMirror5-imba

Tag for CodeMirror v5 - mode Imba and imba-lint

## Install

`git submodule add -b CodeMirror5 git@github.com:qwars/CodeMirror5-imba.git patch-widgets-folder/codemirror`

`yarn add codemirror@5`

## Lint

```
const webpack = require('webpack');
```
And add:

```
plugins: [
.....
        new webpack.DefinePlugin({
            .....
            'process.env.CODEMIRROR_LINT': JSON.stringify(['css', 'imba', 'html', 'json', 'coffeescript', 'javascript', 'yaml']),
            .....
        }),
.....
]
```

## Triggers
    If exists event ':apply' then view button
    

## Import

```
import Widget as ImbaCodeMirror from './path-widgets-folder/codemirror

... any tag ...


def inputValue e
    console.log e.target.value

def render
    <self>
    
        .... any ... 
        
        <ImbaCodeMirror[ data-text ] :input.inputValue>

```


