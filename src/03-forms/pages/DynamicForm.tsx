import { Form, Formik } from "formik";
import formJson from "../data/custom-form.json";
import { MySelect, MyTextInput } from "../components";
import * as Yup from 'yup'

const initialValues: {[key: string]: any} = {}
const requiredFields: {[key: string]: any} = {}

for (const input of formJson) {
    initialValues[input.name] = input.value
    if(!input.validations) continue;

    let schema = Yup.string()
    for (const rule of input.validations) {
        if(rule.type === 'required') {
            schema = schema.required('Mandatory field')
        }

        if(rule.type === 'minLength') {
            const realRuleValue = (rule as any).value || 2
            schema = schema.min(realRuleValue, `${realRuleValue} characters as minimum`)
        }

        if(rule.type === 'email'){
            schema = schema.email('Email invalid. Check its format')
        }
    }
    requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({...requiredFields})

export const DynamicForm = () => {
  return (
    <div>
        <h1>DynamicForm</h1>
        <Formik
            initialValues={initialValues}
            onSubmit={(values)=>{
                console.log('values submitted')
                console.log(values)
            }}
            validationSchema={validationSchema}
        >
            {
                (formik) => (
                    <Form>
                        {
                            formJson.map(({type, name, placeholder, label, options}) => {
                                if(type === 'input' || type === 'password' || type === 'email'){
                                    return <MyTextInput
                                        key={name}
                                        type={type as any}
                                        name={name}
                                        label={label}
                                        placeholder={placeholder}
                                    />
                                } else if (type === 'select') {
                                    return (
                                        <MySelect
                                            key={name}
                                            label={label}
                                            name={name}
                                        >
                                            <option value="">Select an option</option>
                                            {
                                                options?.map(({id, label}) => (
                                                    <option key={id} value={id}>{label}</option>
                                                ))
                                            }
                                        </MySelect>
                                    )
                                }
                            })
                            
                        }
                        <button type='submit'>Submit</button>
                    </Form> 
                )
            }
        </Formik>
    </div>
  )
}
