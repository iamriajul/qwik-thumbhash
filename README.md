# qwik-thumbhash

[![NPM Version](https://img.shields.io/npm/v/qwik-thumbhash.svg?style=flat)](https://www.npmjs.com/package/qwik-thumbhash)
[![NPM Downloads](https://img.shields.io/npm/dm/qwik-thumbhash.svg?style=flat)](https://npmcharts.com/compare/qwik-thumbhash?minimal=true)

> Qwik components for using the [thumbhash algorithm](https://evanw.github.io/thumbhash/) in your Qwik projects

[Demo](https://evanw.github.io/thumbhash/)

## Install

```sh
npm install --save thumbhash qwik-thumbhash
```

## Usage

### `<Thumbhash />`

```js
import { Thumbhash } from "qwik-thumbhash";
```

### Description

`Thumbhash` component is the recommended way to render thumbhashes in your Qwik projects.

#### Props

| name                             | description                                                                   |
|----------------------------------|-------------------------------------------------------------------------------|
| `hash` (string)                  | The encoded (base64) thumbhash string.                                        |
| `width` (int)                    | Width of the img element.                                                     |
| `height` (int)                   | Height of the img element.                                                    |
| `strategy` (VisibleTaskStrategy) | The strategy to use to determine when the "VisibleTask" should first execute. |


#### Example

```jsx
<Thumbhash
  hash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
  width={400}
  height={300}
/>
```

### `decodeThumbhashBase64ToDataUrl` function

```js
import { decodeThumbhashBase64ToDataUrl } from "qwik-thumbhash";

const dataUrl = decodeThumbhashBase64ToDataUrl("1QcSHQRnh493V4dIh4eXh1h4kJUI");
```

#### VisibleTaskStrategy
`useVisibleTask$` hook has been used to decode the thumbhash string and render the canvas.

| value                   | description                                                                                                                     |
|-------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `intersection-observer` | the task will first execute when the element is visible in the viewport, under the hood it uses the IntersectionObserver API.   |
| `document-ready`        | document-ready: the task will first execute when the document is ready, under the hood it uses the document load event.         |
| `document-idle`         | document-idle: the task will first execute when the document is idle, under the hood it uses the requestIdleCallback API.       |

#### Experimental - IMG element with Thumbhash support.

`ThumbhashImg` The component is just a wrapper around <img> tag, it just adds `data-hash` attribute to the img tag.
And the `data-hash` attribute is consumed by `qwik-thumbhash/worker` to decode the thumbhash string and render the image while the actual image is being downloaded.

```tsx
import { ThumbhashImg } from "qwik-thumbhash";

export default component$(() => {
  return <ThumbhashImg
    src="https://example.com/image.jpg"
    hash="1QcSHQRnh493V4dIh4eXh1h4kJUI"
    //... other props for <img> tag
  />;
});
```

#### Note:
We're decoding in browser because the decoding in server would defeat the purpose of
using thumbhash string which is very small. usually under 30 bytes.
But when we decode it to dataURL it becomes more than 4KB. So we're decoding it in browser.
Transferring 30 bytes from server to browser is much faster than transferring 4KB.

#### TODO:
- [ ] Consider using the `worker$` (currently experimental) to decode the thumbhash string.

## Browser support

thumbhash depends on `Uint8ClampedArray`, which is supported on all mainstream browsers and >=IE11.
