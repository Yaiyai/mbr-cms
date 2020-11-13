import { useState } from 'react';

const useCounter = (initialState = 10) => {
	const [counter, setCounter] = useState(initialState);

	const increment = (factor = 1) => {
		setCounter(counter + factor);
	};

	const decrement = (factor = 1) => {
		setCounter(counter - factor);
	};

	const reset = () => {
		setCounter(initialState);
	};

	return {
		counter,
		increment,
		decrement,
		reset,
	};
};

export default useCounter;
