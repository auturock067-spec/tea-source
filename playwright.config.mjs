import {defineConfig} from '@playwright/test';
const remote=process.env.TEST_BASE_URL;
export default defineConfig({
 testDir:'./tests/browser',fullyParallel:false,workers:2,retries:process.env.CI?1:0,timeout:45000,
 reporter:[['list'],['html',{open:'never'}],['json',{outputFile:'evidence/browser-results.json'}]],
 use:{baseURL:remote||'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure',browserName:'chromium'},
 webServer:remote?undefined:{command:'node scripts/serve.mjs',url:'http://127.0.0.1:4173/en/',reuseExistingServer:!process.env.CI},
});
