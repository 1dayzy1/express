import { body } from 'express-validator';



export  const loginValidation = [
    body("email").isEmail(),
    body("password").isLength({min:3}),
   
];



export  const registerValidation = [
    body("email").isEmail(),
    body("password").isLength({min:3}),
    body("fullName").isLength({min:5}),
    body("avatarUrl").optional().isURL()
];



export const postCreateValidation = [
    body('title').isLength({min:3}).isString(),
    body('text').isLength({min:10}).isString(),
    body('tags').optional().isString(),
    body('imageUrl').optional().isString()

];

