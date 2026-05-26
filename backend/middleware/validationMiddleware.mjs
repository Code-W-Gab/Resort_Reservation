import { body } from 'express-validator'

export const registerRules = [
  body('FullName')
    .notEmpty().withMessage('Name must not empty')
    .isString().withMessage('Name must be string'),

  body('Email')
    .isEmail().withMessage('Please enter a valid email address'),

  body('Password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Password must be at least 6 characters and include letters and numbers.')
]

export const loginRules = [
  body('Email')
    .isEmail().withMessage('Please enter a valid email address'),

  body('Password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0
    }).withMessage('Password must be at least 6 characters and include letters and numbers.')
]