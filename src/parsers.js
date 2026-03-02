import yaml from 'js-yaml';

const parseJson = (data) => JSON.parse(data);
const parseYaml = (data) => yaml.load(data);

const parsers = {
  json: parseJson,
  yml: parseYaml,
  yaml: parseYaml,
};

export default (data, format) => {
  const parser = parsers[format];
  if (!parser) {
    throw new Error(`Unsupported format: ${format}`);
  }
  return parser(data);
};