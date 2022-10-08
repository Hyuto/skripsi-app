/// <reference types="nativewind/types" />

const loadPyodide = (): Promise<Pyodide> => {};

interface Pyodide {
  loadPackage: (text: string | string[]) => Promise<void>;
  pyimport: (text: string | string[]) => any;
  runPython: (text: string) => any;
  runPythonAsync: (text: string) => Promise<any>;
}
