import fs from 'fs';

type PlaywrightStats = {
  expected: number;
  unexpected: number;
  duration: number;
};

type PlaywrightReport = {
  stats: PlaywrightStats;
};

const REPORT_PATH = 'playwright-report.json';
const OUTPUT_PATH = 'ui-result.json';

if (!fs.existsSync(REPORT_PATH)) {
  console.error('❌ playwright-report.json not found');
  process.exit(1);
}

const raw: PlaywrightReport = JSON.parse(
  fs.readFileSync(REPORT_PATH, 'utf-8')
);

const { expected, unexpected, duration } = raw.stats;

const result = {
  type: 'UI',
  total: expected,
  passed: expected - unexpected,
  failed: unexpected,
  duration: Math.round(duration),
  status: unexpected === 0 ? 'PASS' : 'FAIL',
  timestamp: new Date().toISOString(),
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
