import React from 'react';
import { View, Text } from 'react-native';

const ProductData = ({ route }) => {
  const { category } = route.params;

  // Assuming you have a function to fetch category products based on the category name
  const fetchCategoryProducts = async () => {
    // Implement your logic to fetch products for the given category
    // For example, you might use an API call or query a local database
    // Update the component's state with the fetched products
  };

  React.useEffect(() => {
    fetchCategoryProducts();
  }, []); // Run the effect only once when the component mounts

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold', margin: 10, color: 'black' }}>
        Products in {category}
      </Text>
      {/* Render your list of products here */}
    </View>
  );
};

export default ProductData;