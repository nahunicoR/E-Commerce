import React from "react";

function Pagination({ productsPerPage, allProducts, pagination }) {
	const pageNumbers = [];
	for (let i = 1; i < Math.ceil(allProducts / productsPerPage); i++) {
		pageNumbers.push(i);
	}
	return (
		<div>
			<nav>
				<ul>
					{pageNumbers &&
						pageNumbers.map((number) => (
							<button key={number} onClick={() => pagination(number)}>
								{number}
							</button>
						))}
				</ul>
			</nav>
		</div>
	);
}

export default Pagination;
