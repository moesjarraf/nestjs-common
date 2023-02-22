import fs from 'fs';

export function fileExists(path: string) {
  return fs.promises.access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};
