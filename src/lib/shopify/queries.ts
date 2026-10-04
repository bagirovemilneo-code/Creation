export const PRODUCTS_QUERY = `
  query Catalog {
    products(first: 12) {
      nodes {
        id
        handle
        title
        description
        availableForSale
        priceRange { minVariantPrice { amount currencyCode } }
      }
    }
  }
`;

