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
  - npm install -save vdr-react-form-manager
- yarn
  - yarn add -save vdr-react-form-manager

# Recommandation

- Even if is possible to use vdr-react-form-manager for react js project, we precognize to use
  it with typescript

# How use it

const { <br />
resetForm <br />
handleFormChange <br />
getFormValues <br />
getInputProps <br />
addInputs <br />
updateInputs <br />
removeInputs <br />
validateInputs <br />
updateFormProps <br />
emitLastFieldUpdated <br />
lastFieldUpdated <br />
isFormDisabled <br />
isFormValid <br />
isFormTouched <br />
isFormPristine <br />
formErrors <br />
formCustomsProps <br />
} = useFormManager(IFormInitalState)

> IFormInitalState: is an object containing the initial form properties

| Operation            | usage                                 | return value             | description                                                                                                                                                                                                                |
| -------------------- | ------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| resetForm            | resetForm()                           | void                     | reset the form with the initialValues                                                                                                                                                                                      |
| handleFormChange     | handleFormChange(onformOnChangeEvent) | void                     | Pass the formOnChangeEvent to this method                                                                                                                                                                                  |
| getFormValues        | getFormValues()                       | { k : v }                | return an object with form values<br /><br />k : input name<br />v : input value(s)                                                                                                                                        |
| getInputProps        | getInputProps(x)                      | input properties         | return the input properties<br /><br />x : input name                                                                                                                                                                      |
| addInputs            | addInputs({ k : v })                     | void                     | add new input(s)<br /><br />k : input name<br />v : input properties                                                                                                                                                       |
| updateInputs         | updateInputs({ k : v })                     | void                     | update input(s)<br /><br />k : input name<br />v : input properties to update                                                                                                                                              |
| removeInputs         | removeInputs(x)                       | void                     | remove input(s)<br /><br />x : array of input name                                                                                                                                                                         |
| validateInputs       | validateInputs(x)                     | void                     | will check the validity of your form and inputs. Each input.errors and formErros will be regenared,<br /><br />x : null = all inputs will be checked<br /><br />x : string[] = only the inputs is the list will be checked |
| updateFormProps      | updateFormProps(x)                    | void                     | update the form properties<br /><br />x : FormProperties                                                                                                                                                                   |
| emitLastFieldUpdated | emitLastFieldUpdated(x)               | void                     | configure if you want to receive the name of the latest input updated<br /><br />x : true -> lastFieldUpdated will be setted<br />x : false -> lastfieldUpdated = null<br>default is true                                  |
| lastFieldUpdated     | lastFieldUpdated                      | { inputName: x } or null | x : contains the name of the latest input updated if emitLastFieldUpdated = true<br /><br />return null if emitLastFieldUpdated = false                                                                                    |
| isFormDisabled       | isFormDisabled                        | boolean                  | contains the form disabled status                                                                                                                                                                                          |
| isFormValid          | isFormValid                           | boolean                  | contains the form validity status                                                                                                                                                                                           |
| isFormTouched | isFormTouched | boolean | The form has been touched |
| isFormPristine | isFormPristine | boolean | The form has not been modified yet |
| formErrors           | formErros                             | x                        | contains the form errors<br /><br />x : empty array if no errors<br />x : string[] array of string if the form has errors                                                                                                  |
| formCustomsProps     | formCustomsProps                      | { k : v }                | return an object with form values<br /><br />k : key<br />v: value                                                                                                                                                         |
# IFormInitialState
> const { .... } = useFormManager(IFormInitialState)

You need to pass has parameter an object containing the initials props of your form.

|PropertyName|type|description|optional|
|-|-|-|-|
|formInputs| IStateInputs | Object containing the inputs properties |false|
|formValidators|array[IFormValidator]|Array containing functions which implement IFormValidator in order to validate the form|true|
|formCustomsProps| object{ k : v }|k : custom property name<br>v : custom property value|true|
|formClassNames|string[]|Array of strings who contains the initial form classes|true|

# IStateInputs:  {K, V} object
> Object containing the inputs properties

k : input name<br />
v : input properties object

## input properties
|PropertyName|type|description| optional|
|-|-|-|-|
|name|string| input name name - required and unique|false|
|id|string|input id|true|
|value|any|input value|true|
|label|string|string who contains the input label|true|
|isValid|boolean| the input content is valid|true|
|errors|string[]|contains the input erros.<br />Empty array if no errors|true|
|disabled|boolean|contains the input disabled status|true|
|classNames|string[]|contains the input classes|true|
|validators|IFormInputValidator[]|Array containing functions which implement IFormInputValidator in order to validate the input|true|
|availableValues|IFormInputAvailableValue[]|Array containing objects which implement IFormInputAvailableValue in order to manage selectbox and multiple checkboxes|true|
|customProps|IKeyAny|object{ k : v }|k : custom property name<br>v : custom property value|true|
|updateId|string|random string who changes every time that the input value changes.<br />Ex: You can use this field to implement areequals function for React.memo|true|
|isTouched|boolean|The input has been touched|true|
|isPristine|boolean|The input has not been modified yet|true|


# GitHub examples

Contains examples to manage a form using the library
https://github.com/valentino-drappa/vdr-react-form-manager-sandbox
