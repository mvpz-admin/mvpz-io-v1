import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

let products = [
  // product 1
  {
    name: "RCB Official Team Jersey 2024 - Premium Edition",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462922/b61493218039557.679a881c8d9e7_kb4kta.jpg", // Add your thumbnail URL here
    tags: ["TEAM_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
    price: 25,
    discountPercent: 10,
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462922/b61493218039557.679a881c8d9e7_kb4kta.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462823/c3032d218039557.679a881b46842_mriuqh.jpg",
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    tribeId: "67a5af974286518cfdc84129",
    // athleteId: "clx77777777777777777777777",
    isActive: true,
  },
  // product 2
  {
    name: "Virat Kohli Signature Collection Premium Hoodie",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462937/b9630e218039557.679a881c8d4aa_qt7h5q.jpg", // Add your thumbnail URL here
    tags: ["ATHLETE_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
    price: 32, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462937/b9630e218039557.679a881c8d4aa_qt7h5q.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462944/3e50ee218039557.679a881d27ce3_pvybea.jpg",
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
  // product 3
  {
    name: "Mumbai Indians Elite Performance Training Jersey",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462979/85342d218039557.679a881e4e104_zrwvqd.jpg",
    tags: ["BEST_SELLER", "NEW_ARRIVAL"],
    price: 26, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462979/85342d218039557.679a881e4e104_zrwvqd.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742462993/18a7bc218039557.679a881e4dbf9_jidlzd.jpg",
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    // athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
   // product 4
   {
    name: "CSK Dhoni Special Edition Sleeveless Training Vest",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
"https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463540/69ce6b219787015.67b78d6426636_njgif9.jpg",    tags: ["BEST_SELLER", "NEW_ARRIVAL"],
    price: 53.21, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
     
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    // athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
   // product 5
   {
    name: "Regular Fit Cotton cargo joggers with DryMove",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
"https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463532/688b3d219787015.67b78d642414f_gp8nab.jpg",    tags: ["BEST_SELLER", "NEW_ARRIVAL"],
    price: 12.23,
    discountPercent: 10, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
     
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    // athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
   // product 6
   {
    name: "Loose Fit Sports top with DryMove™",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
"https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463532/688b3d219787015.67b78d642414f_gp8nab.jpg",    tags: ["BEST_SELLER", "NEW_ARRIVAL"],
    price: 62.23,
    discountPercent: 10, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
     
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    // athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
   // product 8
   {
    name: "Loose Fit Sports top with DryMove™",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
"https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463532/688b3d219787015.67b78d642414f_gp8nab.jpg",    tags: ["BEST_SELLER", "NEW_ARRIVAL"],
    price: 62.23,
    discountPercent: 10, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
     
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    // athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
  // product 9
  {
    name: "Moltobellino ST France Paris Standard Fit Hoodie",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463272/334932178165359.64e389dee6e0d_iwoygp.jpg", // Add your thumbnail URL here
    tags: ["TEAM_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
    price: 25,
    discountPercent: 12,
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463272/334932178165359.64e389dee6e0d_iwoygp.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463214/646127178165359.64e389df65cc5_uuixxp.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463129/d66aa6178165359.64e389df66987_rb97xo.gif"
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    tribeId: "67a5af974286518cfdc84129",
    // athleteId: "clx77777777777777777777777",
    isActive: true,
  },
   // product 10
   {
    name: "Illuso Soft Special Double-Sided Basic Plain Hoodie",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463263/79035b178165359.64e389dee7e42_x9dov7.jpg", // Add your thumbnail URL here
    tags: ["ATHLETE_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
    price: 32, // Add your price here
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463263/79035b178165359.64e389dee7e42_x9dov7.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463222/01ff9c178165359.64e389df687c1_o9ulvo.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463129/d66aa6178165359.64e389df66987_rb97xo.gif",
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
   // product 11
   {
    name: "Illuso Soft Special Double-Sided Basic Plain Hoodie",
    description:
      "Official LE SSERAFIM x Alpha Industries collaboration MA-1 Flight Jacket",
    thumbnail:
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463255/084135178165359.64e389de863de_ml3pyg.jpg", // Add your thumbnail URL here
    tags: ["ATHLETE_MERCHANDISE", "BEST_SELLER", "NEW_ARRIVAL"],
    price: 65, // Add your price here
    discountPercent: 10,
    sizeQuantities: [
      { size: "M", quantity: 10 },
      { size: "L", quantity: 10 },
      { size: "XL", quantity: 10 },
    ],
    images: [
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463255/084135178165359.64e389de863de_ml3pyg.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463211/bda245178165359.64e389df699ec_qnpftt.jpg",
      "https://res.cloudinary.com/dg0ahswkh/image/upload/v1742463129/d66aa6178165359.64e389df66987_rb97xo.gif",
    ], // Add your image URLs here
    productInfo: [
      {
        key: "Brand",
        value: "Alpha Industries",
      },
      {
        key: "Product Material",
        value: "SHELL: 100% NYLON\nLINING: 100% NYLON\nFILLING: 100% POLYESTER",
      },
      {
        key: "Size Guide",
        value:
          "M: 67cm x 48cm x 65cm x 69cm (Body length x Shoulder width x Chest width x Sleeve length)\nL: 69cm x 51cm x 70cm x 70cm\nXL: 70cm x 53cm x 75cm x 71cm",
      },
      {
        key: "Contents",
        value: "1EA",
      },
      {
        key: "Manufacturer",
        value: "ALPHA INDUSTRIES INC.",
      },
      {
        key: "Country of Manufacture",
        value: "China",
      },
      {
        key: "Manufacturing Date",
        value: "2024.09",
      },
      {
        key: "Care Instructions",
        value:
          "1. Do dry-clean with cold water.\n2. Do not iron.\n3. If polluted or soaked in sweats, dry-clean it immediately.\n4. Please note that bleach, contamination, and other deterioration of the product such as contraction caused by mishandling of the product cannot be the cause for indemnity.\n5. You cannot be compensated for the damaged product if you do not wash the product according to the care label.\n6. Please note that RIB on wrists and the neck may get loose, so do not pull them excessively when wearing it.\n7. We monitor and examine products before packing, but as products are mass-produced, we cannot guarantee that all products are ideally perfect.\n8. For outerwear, additional dying processes may result in unavoidable color transfers or fading.\n9. Wrinkles may occur due to the nature of the material, or it can be caused while packaging the product.",
      },
      {
        key: "Quality Assurance",
        value:
          "In accordance with relevant laws and the criteria for the settlement of consumer disputes",
      },
      {
        key: "Customer Support",
        value: "Weverse Shop Customer Center: 1544-0790",
      },
      {
        key: "Business Information",
        value:
          "Company: WEVERSE COMPANY Inc.\nRepresentative: JOON WON CHOI\nContact: +82 1544-0790\nEmail: support@weverse.io\nAddress: C, 6F, PangyoTech-onetower, 131, Bundangnaegok-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea\nBusiness Registration: 716-87-01158\nMail Order Registration: 2022-SeongnamBundangA-0557",
      },
    ],
    // tribeId: "67a5af974286518cfdc84129",
    athleteId: "67a5c0380d9c26cff12b2056",
    isActive: true,
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Create all products in parallel
    const createdProducts = await Promise.all(
      products.map(async (prod) => {
        return await prisma.apparel.create({
          data: {
            ...prod,
            athleteId: prod.athleteId || undefined,
            tribeId: prod.tribeId || undefined
          } as any
        });
      })
    );

    // Return success response with created products
    return res.status(201).json({
      message: "Products created successfully",
      count: createdProducts.length,
      products: createdProducts
    });

  } catch (error) {
    console.error("Error creating products:", error);
    return res.status(500).json({ 
      error: "Failed to create products",
      details: error instanceof Error ? error.message : "Unknown error occurred"
    });
  }
}
