// Element.jsx
//
// Implementation of the React component that is used
// by the ElementLibrary defined in ../../library.py
//
// This component displays a string in reverse
import { useDynamicProperty } from "taipy-gui";

interface ElementProps {
  // Declare the properties for the Element component
  text?: string;
}

export default function Element({ text }: ElementProps) {
  // Dynamic string property
  const textProperty = useDynamicProperty(text, "<empty>", "");

  if (!textProperty) {
    return <span />
  }
  // Display the reversed text content
  return (
    <span>
    {textProperty.split("").reverse().join("")}
    </span>
  );
}
