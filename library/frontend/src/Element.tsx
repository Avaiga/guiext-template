// Element.jsx
//
// Implementation of the React component that is used
// by the ElementLibrary defined in ../../library.py

interface ElementProps {
  // Declare the properties for the Element component
  // Ex:
  //   value?: string;
  //   defaultValue?: string;
}

export default function Element({ /* properties... */ }: ElementProps) {
  // Implementation of the component
  return <span>Custom Element</span>;
}
