import {
  component$,
  CSSProperties,
  QwikIntrinsicElements,
  useSignal,
  useVisibleTask$,
  VisibleTaskStrategy
} from "@builder.io/qwik";
import {thumbHashToDataURL} from "thumbhash";

type ImgAttributes = Omit<QwikIntrinsicElements['img'], 'children'>;

type Props = ImgAttributes & {
  hash: string;
  height: number;
  width: number;
  /** Must be an object, not string */
  style?: CSSProperties;
  /**
   * The strategy to use to determine when the "VisibleTask" should first execute.
   *
   * - `intersection-observer`: the task will first execute when the element is visible in the
   *   viewport, under the hood it uses the IntersectionObserver API.
   * - `document-ready`: the task will first execute when the document is ready, under the hood it
   *   uses the document `load` event.
   * - `document-idle`: the task will first execute when the document is idle, under the hood it uses
   *   the requestIdleCallback API.
   */
  strategy?: VisibleTaskStrategy;
};

export default component$<Props>(({hash, width, height, style, strategy, ...rest}) => {
  const url = useSignal<string>();

  useVisibleTask$(ctx => {
    ctx.track(() => hash && width && height);

    const hashArray = Uint8Array.from(atob(hash), c => c.charCodeAt(0))
    url.value = thumbHashToDataURL(hashArray);

  }, {strategy: strategy});

  return (
    <img
      {...rest}
      src={url.value}
      style={{
        display: 'inline-block',
        width: typeof width as unknown === 'number' ? `${width}px` : width,
        height: typeof height as unknown === 'number' ? `${height}px` : height,
        ...style as any,
        position: 'relative'
      }}
    />
  );
});