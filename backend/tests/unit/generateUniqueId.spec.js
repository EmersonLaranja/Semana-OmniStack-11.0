const generateIdUnique = require('../../src/utils/generateUniqueId');

describe('Generate  Unique ID',()=>{
    it('should generate an unique ID',()=>{
        const id=generateIdUnique();

        expect(id).toHaveLength(8);
    });
});