import * as yup from 'yup'
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

// const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
// min 5 characters, 1 upper case, i lower case 1 numeric digit

export const registerSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email')
        .required('Required'),
    username: yup.string().min(3).required('Required'),
    password: yup
        .string()
        .min(4)
        .matches(PWD_REGEX, {message: 'Password not strong enough'})
        .required('Required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), null], "passwords must match")
        .required("required")
})