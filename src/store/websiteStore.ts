import { create } from "zustand";
import { mergeDeep } from "../utils/deepMerge";

function editObjectPropertyByString(o: any, s: string, data: any) {
  s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
  s = s.replace(/^\./, ""); // strip a leading dot
  var a = s.split(".");
  for (var i = 0, n = a.length - 1; i < n; ++i) {
    var k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return;
    }
  }
  o[a[a.length - 1]] = data;
  return o;
}

export const useWebsiteStore = create((set, get: any) => ({
  id: null,
  data: null,
  editingKey: null,
  setWebsiteData: (data: any) => {
    return set({ data });
  },
  // editWebsiteData: (key: string, editedData: any) => {
  //   const object = key
  //     .split(".")
  //     .reduceRight((acc, key) => ({ [key]: acc } as any), editedData);
  //   const data = get().data;
  //   let deep = mergeDeep(data, object);
  //   // let copied = { ...deep };
  //   return set({ data: deep });
  // },
  editWebsiteData: (key: string, editedData: any) => {
    const data = get().data;
    let object = { ...data };
    object = editObjectPropertyByString(object, key, editedData);
    let deep = mergeDeep(data, object);
    // let copied = { ...deep };
    return set({ data: deep });
  },
  saveWebsiteData: () => {
    const data = get().data;
    let copied = { ...data };
    return set({ data: copied });
  },
  setEditingKey: (key: string) => {
    return set({ editingKey: key });
  },
  setId: (id: string) => {
    return set({ id });
  },
}));
