import { useEffect, useRef, useState } from 'react'

export const useFetch = (url) => {
	const isMounted = useRef(true)
	const [data, setData] = useState({ data: null })

	useEffect(() => {
		return () => {
			isMounted.current = false
		}
	}, [])

	useEffect(() => {
		setData({ data: null })

		fetch(url)
			.then((resp) => resp.json())
			.then((resp) => {
				if (isMounted.current) {
					setData({
						data: resp,
					})
				}
			})
			.catch((err) => new Error(err))
	}, [url])

	return data
}
