export const Input = ({
	name,
	label,
	type,
	placeholder,
	...rest
}) => {
	return (
		<div className="mb-2">
			<label
				className="form-label"
				htmlFor={ name }
			>
				{ label }
			</label>
			<input
				className="form-control"
				type={ type }
				name={ name }
				placeholder={ placeholder }
				id={ name }
				{ ...rest }
			/>
		</div>
	)
}

export const TextArea = ({
	name,
	label,
	placeholder,
	...rest
}) => {
	return (
		<div className="mb-2">
			<label
					className="form-label"
					htmlFor={ name }
				>
					{ label }
				</label>
				<textarea
					className="form-control"
					name={ name }
					placeholder={ placeholder }
					id={ name }
					{ ...rest }
				></textarea>
		</div>
	)
}