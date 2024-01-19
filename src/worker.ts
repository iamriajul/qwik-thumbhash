import {thumbHashToDataURL} from "thumbhash";

const decodeThumbhashBase64ToDataUrl = (hash: string) => {
  return thumbHashToDataURL(Uint8Array.from(atob(hash), c => c.charCodeAt(0)));
}

const checkForHash = async () => {
  // console.log("checkForHash");
  const imgs = document.getElementsByTagName("img");

  let processed = 0;

  // @ts-ignore
  for (const img of imgs) {
    if (img.complete) continue;

    // @ts-ignore
    const hash = img.getAttribute("data-hash") || window.defaultDataHash;
    if (!hash) continue;

    const hashDataUrl = decodeThumbhashBase64ToDataUrl(hash);

    if (img.complete) continue;

    img.style.backgroundImage = `url(${hashDataUrl})`;
    img.style.backgroundSize = "cover";

    img.addEventListener("load", function () {
      img.style.backgroundImage = "";
      img.style.backgroundSize = "";
    }, {
      once: true,
    });

    processed++;

    // Allow the thread to do other important things
    if (5 <= processed) {
      await new Promise(resolve => setTimeout(resolve, 20));
    }
  }
};

const run = async () => {
  await checkForHash();

  let timeoutId: number;
  const observer = new MutationObserver(async (mutations) => {
    // console.log("observer", mutations);
    if (mutations.find(e => {
      if (!e.addedNodes.length) {
        return false;
      }
      const imageNode = e.addedNodes[0];
      if (imageNode.nodeName === "IMG") {
        return true;
      }
      if (imageNode instanceof HTMLElement) {
        return !!imageNode.querySelector("img");
      }
      return false;
    })) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkForHash, 100);
    }
  });

  const container = document.querySelector("main") || document.body;
  observer.observe(container, {
    childList: true,
    subtree: true,
    attributeFilter: ["data-hash", "src", "srcset"],
  });
};

run();