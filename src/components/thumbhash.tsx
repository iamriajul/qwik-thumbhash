import {
  component$,
  QwikIntrinsicElements,
  useSignal,
  useVisibleTask$,
  VisibleTaskStrategy
} from "@builder.io/qwik";
import {decodeThumbhashBase64ToDataUrl} from "../utils/base64";

type ImgAttributes = Omit<QwikIntrinsicElements['img'], 'children'>;

type Props = ImgAttributes & {
  hash: string;
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

export default component$<Props>(({hash, strategy, ...rest}) => {
  const url = useSignal<string>();

  useVisibleTask$(ctx => {
    ctx.track(() => hash);

    // We're decoding in browser because the decoding in server would defeat the purpose of
    // using thumbhash string which is very small. usually under 30 bytes.
    // But when we decode it to dataURL it becomes more than 4KB.
    url.value = decodeThumbhashBase64ToDataUrl(hash);
  }, {strategy: strategy});

  return (
    <img
      {...rest}
      src={url.value}
    />
  );
});