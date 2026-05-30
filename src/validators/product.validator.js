import { body } from "express-validator";

export const productValidators = [
  body("name")
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage("product name is required (like: name:'samsung galaxy s24 fe"),

  body("description")
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage("Minimum 10 charecters required in description"),
  body("price")
    .notEmpty()
    .isNumeric({ min: 1 })
    .withMessage("price should be atleast 1"),
  body("category")
    .optional()
    .isIn([
      "Electronics",
      "Fashion",
      "Home",
      "Health",
      "Beauty",
      "Sports",
      "Toys",
      "Groceries",
      "Automotive",
      "Books",
      "Others",
    ])
    .withMessage(
      'only these category allowed ["Electronics","Fashion","Home","Health","Beauty","Sports","Toys","Groceries","Automotive","Books","Others",]',
    ),
];
