export const recentOrders = [
  {
    id: 847291,
    restaurantName: 'Spice Route',
    date: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    total: 34.97,
    status: 'preparing',
    items: [
      {
        name: 'Butter Chicken',
        price: 14.99,
        quantity: 1,
      },
      {
        name: 'Paneer Tikka',
        price: 12.99,
        quantity: 1,
      },
      {
        name: 'Gulab Jamun',
        price: 6.99,
        quantity: 1,
      },
    ],
    restaurantImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3bzdFTaAXFRgvhdJ8WWnT-Tt6H2pMsfvcA&s',
  },
  {
    id: 963147,
    restaurantName: 'T-Grill',
    date: new Date(Date.now() - 45 * 60000).toISOString(), // 45 minutes ago
    total: 39.97,
    status: 'on the way',
    items: [
      {
        name: 'Machboos',
        price: 19.99,
        quantity: 1,
      },
      {
        name: 'Kebab Skewers',
        price: 19.98,
        quantity: 2,
      },
    ],
    restaurantImage:
      'https://lh6.googleusercontent.com/proxy/wpsQwjbqIAY6Hlmmwxx5oWkT5ihpDjETU1NbnOlKzv-qdsLusT1ZFsOl_kNJjAlKUV4VpRCXT7Y83lCtrCG3Prvk9KP6_5chOZDFnAzjboJhow4',
  },
  {
    id: 528496,
    restaurantName: 'Taco Town',
    date: new Date(Date.now() - 2 * 60 * 60000).toISOString(), // 2 hours ago
    total: 23.97,
    status: 'delivered',
    items: [
      {
        name: 'Beef Tacos',
        price: 9.99,
        quantity: 1,
      },
      {
        name: 'Chicken Quesadilla',
        price: 8.99,
        quantity: 1,
      },
      {
        name: 'Churros',
        price: 4.99,
        quantity: 1,
      },
    ],
    restaurantImage: 'https://i0.wp.com/tacotownpgh.com/wp-content/uploads/2022/09/cropped-TT-logo01B-RGB-1440.png?fit=512%2C512&ssl=1',
  },
  {
    id: 741852,
    restaurantName: 'Pasta Paradise',
    date: new Date(Date.now() - 3 * 60 * 60000).toISOString(), // 3 hours ago
    total: 30.97,
    status: 'ready',
    items: [
      {
        name: 'Spaghetti Carbonara',
        price: 22.99,
        quantity: 1,
      },
      {
        name: 'Tiramisu',
        price: 7.98,
        quantity: 2,
      },
    ],
    restaurantImage:
      'https://img.freepik.com/premium-vector/pasta-logo-design-template-vector-round-linear-logo-spaghetti-with-fork-white-background_279597-838.jpg',
  },
  {
    id: 369258,
    restaurantName: 'Spice Route',
    date: new Date(Date.now() - 5 * 60 * 60000).toISOString(), // 5 hours ago
    total: 42.96,
    status: 'delivered',
    items: [
      {
        name: 'Butter Chicken',
        price: 14.99,
        quantity: 2,
      },
      {
        name: 'Gulab Jamun',
        price: 12.98,
        quantity: 1,
      },
    ],
    restaurantImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTl3bzdFTaAXFRgvhdJ8WWnT-Tt6H2pMsfvcA&s',
  },
  {
    id: 159753,
    restaurantName: 'T-Grill',
    date: new Date(Date.now() - 24 * 60 * 60000).toISOString(), // 1 day ago
    total: 0,
    status: 'cancelled',
    items: [
      {
        name: 'Machboos',
        price: 19.99,
        quantity: 2,
      },
    ],
    restaurantImage:
      'https://lh6.googleusercontent.com/proxy/wpsQwjbqIAY6Hlmmwxx5oWkT5ihpDjETU1NbnOlKzv-qdsLusT1ZFsOl_kNJjAlKUV4VpRCXT7Y83lCtrCG3Prvk9KP6_5chOZDFnAzjboJhow4',
  },
  {
    id: 951357,
    restaurantName: 'Taco Town',
    date: new Date(Date.now() - 2 * 24 * 60 * 60000).toISOString(), // 2 days ago
    total: 34.95,
    status: 'delivered',
    items: [
      {
        name: 'Beef Tacos',
        price: 9.99,
        quantity: 2,
      },
      {
        name: 'Chicken Quesadilla',
        price: 8.99,
        quantity: 1,
      },
      {
        name: 'Churros',
        price: 5.98,
        quantity: 1,
      },
    ],
    restaurantImage: 'https://i0.wp.com/tacotownpgh.com/wp-content/uploads/2022/09/cropped-TT-logo01B-RGB-1440.png?fit=512%2C512&ssl=1',
  },
  {
    id: 246813,
    restaurantName: 'Pasta Paradise',
    date: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(), // 3 days ago
    total: 38.97,
    status: 'delivered',
    items: [
      {
        name: 'Spaghetti Carbonara',
        price: 22.99,
        quantity: 1,
      },
      {
        name: 'Tiramisu',
        price: 15.98,
        quantity: 1,
      },
    ],
    restaurantImage:
      'https://img.freepik.com/premium-vector/pasta-logo-design-template-vector-round-linear-logo-spaghetti-with-fork-white-background_279597-838.jpg',
  },
];
