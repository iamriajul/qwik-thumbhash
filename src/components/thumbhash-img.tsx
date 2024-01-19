import {
  component$,
  type PropsOf,
} from "@builder.io/qwik";

type Props = PropsOf<'img'> & {
  hash: string;
  src: string;
};

/**
 * The thumbhash to dataURL conversion will happen without blocking the main thread
 * using Partytown, So you should use partytown-worker.ts in your root.tsx file.
 * And to see hash image you can throttle your network speed to slow 3G and disable cache and reload.
 *
 * Usage:
 * Update root.tsx file with the following code:
 * import thumbhashWorkerUrl from "qwik-thumbhash/worker?worker&url";
 *
 * // Add the following script tag in your root.tsx file
 * <script
 *   type={import.meta.env.DEV ? 'module' : 'text/partytown'}
 *   src={thumbhashWorkerUrl}
 * />
 * // Or if you are not using Partytown, then add the following script tag in your root.tsx file
 * <script
 *   type={import.meta.env.DEV ? 'module' : 'text/javascript'}
 *   src={thumbhashWorkerUrl}
 * />
 */
export default component$<Props>(({hash, ...rest}) => {
  return (
    <img
      {...rest}
      data-hash={hash}
    />
  );
});