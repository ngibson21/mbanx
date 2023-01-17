const getFieldRules = column => {
  const rules = []

  if (!column.isColumnNullable) rules.push('required')

  return rules
}

const getFieldElement = ({ columnDisplayType, columnCode, columnType }) => {
  switch (columnDisplayType) {
    case 'STRING': return 'InputText'
    case 'INTEGER': return 'InputText'
    case 'DECIMAL': return 'InputText'
    case 'BOOLEAN': return 'InputCheckbox'
    case 'DATE': return 'InputDate'
    case 'DATETIME': return 'InputDate'
    case 'TEXT': return 'InputTextArea'
    case 'CODELOOKUP':
      if (columnCode === 'YesNo') return 'InputRadio'
      return 'InputSelect'
    case 'CODEVALUE':
      if (columnCode === 'FILE_UPLOAD') return 'InputFile'
      if (columnType === 'multiselect') return 'InputMultiSelect'

      return 'InputSelect'
  }
}

const getFieldOptions = ({ columnValues, columnCode }) => {
  if (columnCode === 'YesNo') {
    return [
      { text: 'Yes', value: '1' },
      { text: 'No', value: '0' }
    ]
  }
  return columnValues.map(item => ({ text: item.value, value: item.id }))
}

const fieldCreator = column => {
  return {
    name: column.columnName,
    label: column.columnDisplayName,
    element: getFieldElement(column),
    rules: getFieldRules(column),
    options: getFieldOptions(column),
    regex: column.regex
  }
}

const sectionCreator = (section, headers) => {
  const sectionFilter = (acc, header) => {
    if (header.isColumnPrimaryKey || header.columnName === 'client_id') return acc

    if (header.sectionId === section.id) acc.push(header)

    return acc
  }

  return {
    title: section.title,
    description: section.description,
    sectionNumber: section.position,
    schema: headers.reduce(sectionFilter, []).map(fieldCreator)
  }
}

const stepCreator = step => {
  return {
    stepName: step.title,
    stepId: step.stepId,
    stepNumber: step.position,
    stepDescription: step.description || '',
    allowReturn: false,
    sections: step.sections.map(section => sectionCreator(section, step.columnHeaders))
  }
}

export default stepCreator
