// Initial Mock Database Seed File
const seedProducts = [
  {
    id: "p1",
    name: "Horizon Smartwatch Gen 4",
    vendor: "Nexus Tech",
    vendorId: "v_nexus",
    category: "Bespoke Tech",
    brand: "Nexus",
    price: 299.00,
    stock: 25,
    rating: 4.8,
    reviewsCount: 128,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsIgaOJk1ZKiwsjyfauHOQxO7DTZT2RT9Ww5SKhaKjtd-ty8hXyXF6QFjQXUhNg1Jtg_BJCBfMr7E2pXIlET31oaR0mWPLUY9LGLG6Tgf_gL9Lajzf4_S6h4258Ugr2vf6CmFINfKhyUNYSeWVCaDvk-Qf-BFgst-ppMpu0l7RpvrQ38Ni8wFCfmr8U2ZYZFBdhpsaO1Yj2N6iEAq75juyQj7vQtpXvNaGy58uLnptf7SQ3yGgclojrKmioyU3EuZEVGoQ-Pdip44S"
    ],
    reviews: [
      { id: "r1", reviewer: "James T.", score: 5, comment: "Exceptional design and features. Battery lasts all week!" }
    ],
    description: "The Horizon Smartwatch Gen 4 represents the pinnacle of premium wearable engineering, combining luxury styling with rich wellness features."
  },
  {
    id: "p2",
    name: "Studio Pro ANC Wireless",
    vendor: "Nexus Tech",
    vendorId: "v_nexus",
    category: "Bespoke Tech",
    brand: "Nexus",
    price: 449.00,
    stock: 12,
    rating: 5.0,
    reviewsCount: 245,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm"
    ],
    reviews: [
      { id: "r2", reviewer: "Sarah K.", score: 5, comment: "Top-tier noise cancellation. Highly comfortable leather earmuffs." }
    ],
    description: "Premium active noise cancellation studio headphones. High-fidelity audio with warm bass and clear mids."
  },
  {
    id: "p3",
    name: "Terraform Leather Boots",
    vendor: "Vogue Minimal",
    vendorId: "v_vogue",
    category: "Luxury Goods",
    brand: "Terraform",
    price: 185.00,
    stock: 18,
    rating: 4.6,
    reviewsCount: 82,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1"
    ],
    reviews: [],
    description: "Individually handcrafted premium leather boots made from natural oil-tanned calf leather."
  },
  {
    id: "p4",
    name: "Velocity Run '24 Red",
    vendor: "Aurum Collective",
    vendorId: "v_aurum",
    category: "Wellness & Ritual",
    brand: "Velocity",
    price: 120.00,
    stock: 5,
    rating: 4.9,
    reviewsCount: 512,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2D5TWdNIMnYsFxy5Kg-RCMDhHZ04Eu3BR8FkSpvTvKNNWMeorZQqp5cWpfr7fwe-jS01d24MPLzdPRSK-iz3jJvGClQVBftElkXW846SlwiFQfZDQmipbQ6AEZqW5X-JEpzuL4hz_Spw0_4-UJL8-Fwh9aB84Gk2Nz1VDbNQUDGdSOoLeoMtY8-6hzFLNagnD5q76UNUo_n-Z0k0t3lv_1eiLLMSNbqjbfsD0sLC-QTRBIWCGiboXfQHARgfppVxik-VZPQHbvvH",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDO2D5TWdNIMnYsFxy5Kg-RCMDhHZ04Eu3BR8FkSpvTvKNNWMeorZQqp5cWpfr7fwe-jS01d24MPLzdPRSK-iz3jJvGClQVBftElkXW846SlwiFQfZDQmipbQ6AEZqW5X-JEpzuL4hz_Spw0_4-UJL8-Fwh9aB84Gk2Nz1VDbNQUDGdSOoLeoMtY8-6hzFLNagnD5q76UNUo_n-Z0k0t3lv_1eiLLMSNbqjbfsD0sLC-QTRBIWCGiboXfQHARgfppVxik-VZPQHbvvH"
    ],
    reviews: [],
    description: "Premium running shoes built with structural cushion plates for modern lightweight support."
  },
  {
    id: "p5",
    name: "Minimalist Desk Lamp",
    vendor: "Elementa",
    vendorId: "v_elementa",
    category: "Home Studio",
    brand: "Elementa",
    price: 89.00,
    stock: 42,
    rating: 4.5,
    reviewsCount: 67,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA"],
    reviews: [],
    description: "Sleek, adjustable LED desk lamp with touch dimming and warm-to-cool color temperature."
  },
  {
    id: "p6",
    name: "Mechanical Keycap Set",
    vendor: "Elementa",
    vendorId: "v_elementa",
    category: "Bespoke Tech",
    brand: "Elementa",
    price: 65.00,
    stock: 30,
    rating: 4.7,
    reviewsCount: 189,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm"],
    reviews: [],
    description: "Premium dye-sublimated PBT keycaps with a clean, modern aesthetic."
  },
  {
    id: "p7",
    name: "Leather Weekend Bag",
    vendor: "Vogue Minimal",
    vendorId: "v_vogue",
    category: "Luxury Goods",
    brand: "Vogue",
    price: 340.00,
    stock: 8,
    rating: 4.9,
    reviewsCount: 56,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1",
    images: ["https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1"],
    reviews: [],
    description: "Full-grain leather weekend bag with brass hardware and cotton lining."
  },
  {
    id: "p8",
    name: "Professional Series Hybrid Controller Pro",
    vendor: "Nexus Tech",
    vendorId: "v_nexus",
    category: "Bespoke Tech",
    brand: "Nexus",
    price: 129.99,
    stock: 15,
    rating: 4.5,
    reviewsCount: 124,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA",
    images: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCHQGFRQN4Gl9RjTlOzGic94MMqnjU80hmNJ_1wG6iy7BwQRDCX-ZYKTN5aAr7U88WMEdN2B4FZRowe7qKXrJRkbHrt4GHKiIb3kTWNP4EmJY7qhTj4a4E2WdI40RUhU6eCsIeG5yv6e0utPLfU6aHMr22ZNVAdN5GspNLlkLu--lFSnrdNkOfeBl84ZWwCsLdn5Mau4sPguoBfDRX_3NOQWgPD-0ugmYQoDILd7uCY23evTPCxRaNMQFO-fSCXh3oLc4luansa7OY"
    ],
    reviews: [
      { id: "r3", reviewer: "James T.", score: 5, comment: "The build quality is exceptional. It feels substantial and the red accents really pop." },
      { id: "r4", reviewer: "Sarah K.", score: 4, comment: "Fast delivery and the safe payment verification gave me peace of mind." }
    ],
    description: "The Hybrid Controller Pro represents the pinnacle of multi-vendor engineering, combining tactile response with ultra-low latency."
  }
];

const seedUsers = [
  {
    id: "u_buyer",
    email: "buyer@vendex.com",
    password: "password",
    name: "Alexander Great",
    role: "buyer",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG"
  },
  {
    id: "u_vendor",
    email: "vendor@vendex.com",
    password: "password",
    name: "Urban Goods Co.",
    role: "vendor",
    vendorId: "v_nexus",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC41RDevLs5ewhCctkHB4AJm3xzntKMjrI0lIRQlppFG8XsB1XsKrcki4JWqkk2Koc5Qa2tX92-IbjHsbwOa5L0L5X6_P5-8MjdQVa4bG7gyoXypWWilF5VtGdwAxmLv3wsdS52QLyzNQVQHFjRKrmWMGpeaRTpaLgit72PVkEKNVLtC4jy0ABv36fhtrdOcvqfnjD0_2kgnJjJ-4_AhZeFa2r5Q8VGqzr_MK2Y-nASOvvaDuSsIOT4Sgov7R2xGlZLX0XA4fj1ehO4"
  },
  {
    id: "u_admin",
    email: "admin@vendex.com",
    password: "password",
    name: "Platform Administrator",
    role: "admin",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtv7uh8DDOK8CmpozshtBxthpxPB_FLdvcqAhE6kV834vKsZOB7ZW_4c7XCfxrA_bN8OwEQ1tYjgV_Eme4yU0HxPkrBGWz7G1o5Rb7EzvtH-uKZijHLirL-Pp8vCNncf-rQE9u6REjpVZP_p7voTvOq0fG15VKw5IRyjhOD3pYDYRpj-X989-wDTFth3QxcEIPKboycKN1bxQrJoy3p1UdcI04US2oaY--NYu97WA_V0ZnkMfFb01rVKUqej29abLp92DtGkfmdCyG"
  }
];

const seedOrders = [
  {
    id: "VX-9921",
    buyerId: "u_buyer",
    date: "Oct 24, 2026",
    status: "Shipped",
    total: 340.00,
    items: [
      { id: "p7", name: "Leather Weekend Bag", price: 340.00, quantity: 1, vendor: "Vogue Minimal", vendorId: "v_vogue", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCepxAPUA0kVC8EKnRYyzaQtkYga-j_9CB4SFsrdvHM8NTqhtyy_TAQZAMGO-V9CmnE3jSv2zXVhDSZUiBPziczNUjazfBnowF3OjBawX4YIVKKbXxO_uX8MnX18YdWFDPwzGSBbaGYUxj1N-vs8FVWZnFrm5qKYpsg0V9Ty70Dj6mBEE9FhRG8lNXSttk1FcU4_lOosDdoPXhsn2g1l_f8lq383tyj9UMQuV5rGPZ1ubofDSTG0A0SOMj8jdU5nBeZybSvDc0Qj4o1" }
    ],
    shippingDetails: { firstName: "Alexander", lastName: "Great", address: "124 Commerce St", city: "San Francisco", zip: "94103" }
  },
  {
    id: "VX-8742",
    buyerId: "u_buyer",
    date: "Oct 20, 2026",
    status: "Processing",
    total: 85.20,
    items: [
      { id: "p6", name: "Mechanical Keycap Set", price: 65.00, quantity: 1, vendor: "Elementa", vendorId: "v_elementa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBliE1PaoYv17I_Gh971gp-KGKldsJAuIcrseUbmJv8oiQNesLKe8mwz4ueu4EJigY_oDcfWtR6ul9AakipobZFv7OTgAU--WJpgh8he9IQq57CDD1taQFAQjQWdo5xnvdDLU0z3GCqPNEchKpbDyzfPJv59sD5HK0m3i3JC9CfyK-Jlc-KbvamAmWaX2yy-792Hhb2VqlxbW-vZEjGYLW5m3Fob7al2o-rIvVwJRs7TSEgnPhut6mBF8aa4m1jsRVz9oLhPncfduEm" }
    ],
    shippingDetails: { firstName: "Alexander", lastName: "Great", address: "124 Commerce St", city: "San Francisco", zip: "94103" }
  },
  {
    id: "VX-7104",
    buyerId: "u_buyer",
    date: "Oct 15, 2026",
    status: "Delivered",
    total: 120.00,
    items: [
      { id: "p5", name: "Minimalist Desk Lamp", price: 89.00, quantity: 1, vendor: "Elementa", vendorId: "v_elementa", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYzv-tUWHNjSH_RY9Vz7qB-7pylM2zxI9HGJoVZDh6rwbrs1DZyPWRaMdu_RSDCMnUxIa1bK1q_EEg45ED5tNtgC2MV6kCHLALCdzXRw0I3EAGf92-uTvjMlrGQCn0ZqNIqpdODt-GgVbkmEgb0gxaluuNsj5OaE5w0xkq1vx5VH0oAbMd65SF_vDGDD10rrgMzPtSL0UsHqv1lCw-Y4UZ14n5K1YsTOV0PhzZ5ll-osUfkmTOPPni2DYPrYx--OzKLDAdZQhDidxA" }
    ],
    shippingDetails: { firstName: "Alexander", lastName: "Great", address: "124 Commerce St", city: "San Francisco", zip: "94103" }
  }
];

export const mockDb = {
  get: (key, defaultValue = []) => {
    const data = localStorage.getItem(`db_${key}`);
    return data ? JSON.parse(data) : defaultValue;
  },
  set: (key, value) => {
    localStorage.setItem(`db_${key}`, JSON.stringify(value));
  },
  initialize: () => {
    if (!localStorage.getItem("db_products")) mockDb.set("products", seedProducts);
    if (!localStorage.getItem("db_users")) mockDb.set("users", seedUsers);
    if (!localStorage.getItem("db_orders")) mockDb.set("orders", seedOrders);
    if (!localStorage.getItem("db_disputes")) {
      mockDb.set("disputes", [
        {
          id: "DIS-9021",
          claimant: "David Chen",
          claimantAvatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXXvbP3V9Iy--Al41tdCybAqWqjJ0db4au1ozXiyDH5O0-tAFbovxawRZLnHHyUiL-cottm4SP6znjI1qdn_5FNZWjoUtAl5hzkpmW9wZkNP2eU0NRf8nAvviSvI9bHo0mQRp3lLrhsbn5amE668rFjz0f19iULMICoBrl86ENdC2q91rev5vLlhD0DX1ZVnRdxxBY0X3ZZVAvYSsdsPlMejSwCJE-5kM1FvlPmI8F8dOjGHHGvALI_vlkzjAIpPPGJuD-_14k2F2-",
          vendor: "Nexus Tech",
          status: "Open",
          amount: 299.00,
          initiated: "2h ago",
          reason: "Item Damaged on Arrival"
        }
      ]);
    }
    if (!localStorage.getItem("db_audit_logs")) {
      mockDb.set("audit_logs", [
        {
          id: "log_1",
          timestamp: "Oct 31, 2026 14:22:15",
          admin: "Platform Administrator",
          action: "DELETE_PRODUCT",
          resource: "Product #p3 (Terraform Leather Boots)",
          status: "Success",
          ip: "192.168.1.45"
        }
      ]);
    }
  }
};
