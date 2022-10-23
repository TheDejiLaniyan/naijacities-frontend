import * as yup from 'yup'

export const loginSchema = yup.object().shape({
    username: yup.string().required('Required'),
    password: yup
        .string()
        .required()

})