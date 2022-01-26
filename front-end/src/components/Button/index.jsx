import { React } from 'react';

export default function Button(props) {
  return (
    <div>
      <input type="button" { ...props } />
    </div>
  );
}
