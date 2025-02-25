import type { Ref, RefCallback } from "react";

/**
 * Merges multiple React refs into a single ref.
 * All refs receive the same ref value.
 *
 * @template T - The type of elements to refer to.
 * @param {...(Ref<T> | undefined)[]} refs - The refs to merge. Each can be
 *   a ref object (created with `createRef()` / `useRef()`) or a ref callback
 *   function, or even `undefined`.
 * @returns {Ref<T> | RefCallback<T>} A single ref callback that updates all
 *   provided refs with the same ref value.
 */
export function mergeRefs<T>(
  ...refs: (Ref<T> | undefined)[]
): Ref<T> | RefCallback<T> {
  const filteredRefs = refs.filter(Boolean) as Ref<T>[];

  if (filteredRefs.length <= 1) {
    const [firstRef] = filteredRefs;
    return firstRef;
  }

  return function mergedRefs(ref: T | null): void {
    for (const inputRef of filteredRefs) {
      if (typeof inputRef === "function") {
        inputRef(ref);
      } else if (inputRef) {
        inputRef.current = ref;
      }
    }
  };
}
