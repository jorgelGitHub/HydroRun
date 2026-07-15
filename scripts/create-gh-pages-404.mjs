import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const browserOutput = join('dist', 'hydrorun', 'browser');
const appOutput = join('dist', 'hydrorun');
const outputDirectory = existsSync(join(browserOutput, 'index.html')) ? browserOutput : appOutput;

copyFileSync(join(outputDirectory, 'index.html'), join(outputDirectory, '404.html'));
