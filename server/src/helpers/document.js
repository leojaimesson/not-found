const containsProperties = (doc = {}, expected = []) => expected.every(
  expectedProperty => (doc[expectedProperty] !== null && doc[expectedProperty] !== undefined),
);

const missingProperties = (doc = {}, expected = []) => expected.filter(
  expectedProperty => (doc[expectedProperty] == null || doc[expectedProperty] === undefined),
);

export default {
  containsProperties,
  missingProperties,
};
