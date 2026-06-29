#!/usr/bin/env node

/**
 * IndexNow URL Submission Script
 * 
 * Submits all URLs from sitemap.xml to IndexNow for instant indexing
 * by Bing, Yandex, DuckDuckGo, and other search engines.
 * 
 * Usage:
 *   node scripts/indexnow-submit.js
 *   npm run build && npm run indexnow
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const INDEXNOW_KEY = '8f203a652aae462c91d5db6834701a9d';
const INDEXNOW_HOST = 'api.indexnow.org';
const SITE_URL = 'https://www.calculationstation.org';

/**
 * Fetch sitemap.xml from local build or remote URL
 */
async function fetchSitemap() {
  const sitemapPath = path.join(__dirname, '..', '.next', 'server', 'app', 'sitemap.xml.body');
  
  // Try local file first (after build)
  if (fs.existsSync(sitemapPath)) {
    console.log('✓ Reading local sitemap from build');
    return fs.readFileSync(sitemapPath, 'utf8');
  }
  
  // Fallback to remote URL
  console.log('✓ Fetching remote sitemap from', SITE_URL);
  return new Promise((resolve, reject) => {
    https.get(`${SITE_URL}/sitemap.xml`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Parse URLs from sitemap XML
 */
function parseSitemap(xml) {
  const urlMatches = xml.match(/<loc>(.*?)<\/loc>/g);
  if (!urlMatches) {
    throw new Error('No URLs found in sitemap');
  }
  
  const urls = urlMatches.map(match => 
    match.replace(/<\/?loc>/g, '').trim()
  );
  
  console.log(`✓ Found ${urls.length} URLs in sitemap`);
  return urls;
}

/**
 * Submit URLs to IndexNow API
 */
async function submitToIndexNow(urls) {
  const payload = JSON.stringify({
    host: 'www.calculationstation.org',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls
  });

  return new Promise((resolve, reject) => {
    const options = {
      hostname: INDEXNOW_HOST,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✓ Successfully submitted to IndexNow');
          resolve({ status: res.statusCode, data });
        } else if (res.statusCode === 202) {
          console.log('✓ IndexNow accepted submission (processing)');
          resolve({ status: res.statusCode, data });
        } else {
          console.error('✗ IndexNow submission failed:', res.statusCode, data);
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Batch URLs to avoid hitting API limits
 * IndexNow recommends max 10,000 URLs per request
 */
function batchUrls(urls, batchSize = 1000) {
  const batches = [];
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }
  return batches;
}

/**
 * Main submission flow
 */
async function main() {
  console.log('🚀 IndexNow URL Submission Script\n');
  
  try {
    // 1. Fetch sitemap
    console.log('Step 1: Fetching sitemap...');
    const sitemapXml = await fetchSitemap();
    
    // 2. Parse URLs
    console.log('\nStep 2: Parsing URLs...');
    const urls = parseSitemap(sitemapXml);
    
    // 3. Filter and validate URLs
    console.log('\nStep 3: Validating URLs...');
    const validUrls = urls.filter(url => url.startsWith(SITE_URL));
    console.log(`✓ ${validUrls.length} valid URLs (from ${SITE_URL})`);
    
    // 4. Batch URLs for submission
    console.log('\nStep 4: Preparing batches...');
    const batches = batchUrls(validUrls);
    console.log(`✓ ${batches.length} batch(es) to submit`);
    
    // 5. Submit each batch
    console.log('\nStep 5: Submitting to IndexNow...');
    let totalSubmitted = 0;
    
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`\n  Batch ${i + 1}/${batches.length}: ${batch.length} URLs`);
      
      try {
        await submitToIndexNow(batch);
        totalSubmitted += batch.length;
        
        // Rate limiting: wait 1 second between batches
        if (i < batches.length - 1) {
          console.log('  Waiting 1s before next batch...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`  ✗ Batch ${i + 1} failed:`, error.message);
      }
    }
    
    // 6. Summary
    console.log('\n✅ Submission complete!');
    console.log(`   Total URLs submitted: ${totalSubmitted}`);
    console.log(`   IndexNow key: ${INDEXNOW_KEY.substring(0, 8)}...`);
    console.log(`   Verification file: ${SITE_URL}/${INDEXNOW_KEY}.txt`);
    console.log('\n📊 Expected results:');
    console.log('   - Bing: Index within 24-48 hours');
    console.log('   - Yandex: Index within 24-48 hours');
    console.log('   - DuckDuckGo: Index within 1-2 weeks');
    console.log('\n💡 Note: Google does NOT use IndexNow');
    console.log('   Submit sitemap to Google Search Console separately\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run script
main();
