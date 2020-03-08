# vdr-react-form-manager

vdr-react-form-manager is a form manager for React. With vdr-react-form-manager
you can:

- Manage forms
- Manage inputs validation
- Manage cross form inputs validation
- add/remove/update inputs

# Show it in action

Visit [vdr-react-form-manager-sandbox](https://vdr-react-form-manager-sandbox.herokuapp.com/basic/text) website to see several examples of how to use the library.

# Installation

- npm
  - npm install vdr-react-form-manager
- yarn
  - yarn add vdr-react-form-manager

# Recommandation

- Even if is possible to use vdr-react-form-manager for react js project, we precognize to use
  it with typescript

# How use it

const { <br />
    resetForm <br />
    handleFormChange <br />
    getFormValues <br />
    getInputProperties <br />
    addInputs <br />
    updateInputs <br />
    removeInputs <br />
    validateInputs <br />
    updateFormProps <br />
    emitLastFieldUpdated <br />
    lastFieldUpdated <br />
    isFormDisabled <br />
    isFormValid <br />
    formErrors <br />
} = useFormManager(initFormObject)

> initFormObject is an object who contains the initial inputs properties  of your form

| Operation        | usage                                 | return value               | description                           |
| ---------------- | ------------------------------------- | -------------------------- | ------------------------------------- |
| resetForm        | resetForm()                           | void                       | reset the form with the initialValues |
| handleFormChange | handleFormChange(onformOnChangeEvent) | void                       | Pass the formOnChangeEvent to this method|
| getFormValues    | getFormValues()                       | {k:v} | return an object with form values<br /><br />k: input name<br />v=input value(s)     |
| getInputProperties         | getInputProperties(x)                 | input properties | return the input properties<br /><br />x: input name           |
| addInputs | addInputs({k: v}) | void | add new input(s)<br /><br />k:  input name<br />v: input properties |
| updateInputs | addInputs({k: v}) | void | update input(s)<br /><br />k: input name<br />v: input properties to update |
| removeInputs | removeInputs(x) | void | remove input(s)<br /><br />x: array of input name
| validateInputs| validateInputs(x) | void | will check the validity of your form and inputs. Each input.errors and formErros will be regenared,<br /><br />x: null = all inputs will be checked<br /><br />x: string[] = only the inputs is the list will be checked  |
|updateFormProps| updateFormProps(x) | void | update the form properties<br /><br />x: FormProperties|
| emitLastFieldUpdated | emitLastFieldUpdated(x) | void | configure if you want to receive the name of the latest input updated<br /><br />x: true -> lastFieldUpdated will be setted<br />x=false -> lastfieldUpdated = null<br>default is true|
| lastFieldUpdated | lastFieldUpdated | { inputName: x } or null | x: contains the name of the latest input updated if emitLastFieldUpdated = true<br /><br />return null if emitLastFieldUpdated = false|
| isFormDisabled | isFormDisabled | boolean | contains the form disabled status |
| isFormValid | isFormValid | boolean | contais the form validity status |
| formErrors | formErros | x | contains the form errors<br /><br />x: empty array if no errors<br />x: string[] array of string if the form has errors|

# GitHub examples

Contains examples to manage a form using the library
https://github.com/valentino-drappa/vdr-react-form-manager-sandbox
