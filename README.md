# vdr-react-form-manager

With vdr-react-form-manager is a form manager for React. With vdr-react-form-manager
you can:

- Manage forms
- Manage inputs validation
- Manage cross form inputs validation
- add/remove/update inputs

# Installation

- npm
  - npm install vdr-react-form-manager
- yarn
  - yarn add vdr-react-form-manager

# Recommandation

- Even if is possible to use vdr-react-form-manager for react js project, we precognize to use
  it with typescript

# Basics

const {
<br />
resetForm,<br />
handleFormChange,<br />
getFormValues,<br />
getInput,<br />
setFormDisabled,<br />
isFormDisabled,<br />
isFormValid,<br />
formErrors,<br />
lastFieldUpdated,<br />
} = useFormManager(initFormObject)

> initFormObject is an object who contains the initial inputs properties of our form

| Operation        | usage                                 | return value               | description                           |
| ---------------- | ------------------------------------- | -------------------------- | ------------------------------------- |
| resetForm        | resetForm()                           | void                       | reset the form with the initialValues |
| handleFormChange | handleFormChange(<formOnChangeEvent>) | void                       | Form OnChange event listener          |
| getFormValues    | getFormValues()                       | {[inputName]:[inputValue]} | return an object with form values     |
| getInput         | getInput(<inputName>)                 | InputData                  | return the input properties           |
| setFormDisabled  | setFormDisabled(true\|false)          | void                       | enable or disable form                |
| isFormDisabled   | isFormDisabled                        | boolean                    | return the form disabled state        |
| isFormValid      | isFormValid                           | boolean                    | return the form validity              |
| formErrors       | formErros                             | string[]                   | return an array of form errors        |
| lastFieldUpdate  | lastFieldUpdate                       | string                     | return the last field updated         |

# Advanced

const {
<br />
addInputs
,<br />
updateInputs
,<br />
removeInputs
,<br />
emitLastFieldUpdated
,<br />
} = useFormManager(initFormObject)

> initFormObject is an object who contains the initial inputs properties of our form

| Operation            | usage                                       | return value | description                                                        |
| -------------------- | ------------------------------------------- | ------------ | ------------------------------------------------------------------ |
| addInputs            | addInputs({[inputName]: [inputProperties]}) | void         | add new input(s)                                                   |
| updateInputs         | addInputs({[inputName]: [inputProperties]}) | void         | update input(s)                                                    |
| removeInputs         | removeInputs([inputName])                   | void         | remove input(s)                                                    |
| emitLastFieldUpdated | emitLastFieldUpdated(true\|false)           | void         | true: lastFieldUpdate return a value <br /> false: lastFieldUpdate |
