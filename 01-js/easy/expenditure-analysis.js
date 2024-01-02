/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  const totalByCategory = {};

  // Iterate through each transaction
  transactions.forEach((transaction) => {
    const { category, price } = transaction;

    // Aggregate total spent by category
    if (totalByCategory[category]) {
      totalByCategory[category] += price;
    } else {
      totalByCategory[category] = price;
    }
  });

  // Convert the aggregated object into an array of objects
  return Object.keys(totalByCategory).map((category) => ({
    category: category,
    totalSpent: totalByCategory[category],
  }));
}

module.exports = calculateTotalSpentByCategory;
