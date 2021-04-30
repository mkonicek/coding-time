## Running this demo

Install the [Emscripten SDK](https://emscripten.org/docs/getting_started/downloads.html).

Compile this demo `snow.cpp` into WebAssembly:

```
emcc snow.cpp -o snow.html
```

This will output a few files in the current directory:
- `snow.html` and `snow.js` - A single page web app.
- `snow.wasm` - A binary WebAssembly file.

Start a local webserver:
```
npx serve
```

Open the generated single page app: http://localhost:5000/snow

The app will fetch and run `snow.wasm`.

Try clicking different points on the canvas to create something interesting. Here is an example:

![blast](https://user-images.githubusercontent.com/346214/116625372-6bb62680-a941-11eb-9471-1442fa3ba597.gif)

