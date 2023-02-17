// Element.jsx
//
// Implementation of the React component that is used
// by the ElementLibrary defined in ../../library.py
import { useDynamicProperty } from "taipy-gui";

interface ElementProps {
  // Declare the properties for the Element component
  text?: string;
}

export default function Element({ text }: ElementProps) {
  // Dynamic string property
  const textProperty = useDynamicProperty(text, "<empty>", "");

  return <label>Custom element: {textProperty}</label>;
}
