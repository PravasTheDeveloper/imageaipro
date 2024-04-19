import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { increment, decrement } from '@/redux/slice';

function Counter() {
  const count = useSelector((state: RootState) => state.count.value);
  const dispatch = useDispatch<AppDispatch>();

  console.log(count)

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <span>{count}</span>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
}

export default Counter;
