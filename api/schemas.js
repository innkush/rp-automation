const Ajv = require('ajv');
const ajv = new Ajv();

const getAllNamesSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        owner: { type: 'string' }
      },
      required: ['id', 'name', 'owner']
    }
  }


  export const validateContentGetNames = ajv.compile(getAllNamesSchema);
