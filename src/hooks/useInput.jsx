import { useState } from 'react'

const useInput = defaultValue => {
	const [ value, setValue ] = useState(defaultValue ? defaultValue : '')
	return { value, setValue }
}

export default useInput