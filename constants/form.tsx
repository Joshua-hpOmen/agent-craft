export enum UserRegFormType  {
    EMAIL = "email",
    TEXT = "text",
    PASSWORD = "password"
}

export enum UserRegFormIptType {
    SELECT = "select",
    INPUT = "input",
    TEXTAREA = "textarea" 
}

export type UserRegFormOptsType = { value: string, label: string, id: string}[]

type UserRegistrationFormProps = {
    id: string,
    type: UserRegFormType,
    options?: UserRegFormOptsType,
    label?: string,
    placeholder: string,
    name: string
    inputType: UserRegFormIptType
}

export const USER_REGISTRATION_FORM: UserRegistrationFormProps[] = [
    {
        id: '1',
        inputType: UserRegFormIptType.INPUT,
        placeholder: "Full name",
        name: "fullname",
        type: UserRegFormType.TEXT 
    },
    {
        id: '2',
        inputType: UserRegFormIptType.INPUT,
        placeholder: "Email",
        name: "email",
        type: UserRegFormType.EMAIL
    },
    {
        id: '3',
        inputType: UserRegFormIptType.INPUT,
        placeholder: "Confirm email",
        name: "confirmEmail",
        type: UserRegFormType.EMAIL
    },
    {
        id: '4',
        inputType: UserRegFormIptType.INPUT, 
        placeholder: "Password",
        name: "password",
        type: UserRegFormType.PASSWORD
    },
    {
        id: '5',
        inputType: UserRegFormIptType.INPUT,
        placeholder: "Confirm password",
        name: "confirmPassword",
        type: UserRegFormType.PASSWORD
    },
]

export const USER_SIGNIN_FORM: UserRegistrationFormProps[] = [
   {
       id: "1",
       type: UserRegFormType.EMAIL,
       placeholder: "Email",
       name: "email",
       inputType: UserRegFormIptType.INPUT
   },
   {
       id: "2",
       type: UserRegFormType.PASSWORD,
       placeholder: "Enter password",
       name: "password",
       inputType: UserRegFormIptType.INPUT
   }
]