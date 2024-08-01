'use client';

import { useState } from 'react';

export default function Counter() {
  const [state, setstate] = useState(0);
  return <button onClick={() => setstate((prev) => prev + 1)}>{state}</button>;
}
