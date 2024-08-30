import { useState } from 'react';

function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = () => {
    setTick((tick) => tick + 1);
  };
  return update;
}

export default useForceUpdate;
