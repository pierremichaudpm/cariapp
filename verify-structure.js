// Structure verification script for CARI St-Laurent React App
// This script checks if all required files and components are present

const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;

const requiredFiles = [
  // Root files
  'package.json',
  'README.md',

  // Public directory
  'public/index.html',
  'public/manifest.json',
  'public/images/newlogo.png',
  'public/images/immigrant1.webp',
  'public/images/immigrant2.webp',
  'public/images/immigrant3.png',
  'public/images/immigrant4.webp',

  // Source files
  'src/index.js',
  'src/App.js',
  'src/translations.js',
  'src/styles/main.css',

  // Components
  'src/components/Header.js',
  'src/components/Hero.js',
  'src/components/Needs.js',
  'src/components/Services.js',
  'src/components/Appointment.js',
  'src/components/Contact.js',
  'src/components/Chat.js'
];

const requiredDependencies = {
  'react': '^18.2.0',
  'react-dom': '^18.2.0',
  'react-scripts': '^5.0.1'
};

console.log('🔍 Verifying CARI St-Laurent React App structure...\n');

// Check required files
console.log('📁 Checking file structure:');
let allFilesPresent = true;

requiredFiles.forEach(filePath => {
  const fullPath = path.join(projectRoot, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`  ✅ ${filePath}`);
  } else {
    console.log(`  ❌ ${filePath} - MISSING`);
    allFilesPresent = false;
  }
});

// Check package.json dependencies
console.log('\n📦 Checking package.json dependencies:');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

  Object.entries(requiredDependencies).forEach(([dep, expectedVersion]) => {
    const actualVersion = packageJson.dependencies?.[dep];
    if (actualVersion) {
      console.log(`  ✅ ${dep}: ${actualVersion}`);
    } else {
      console.log(`  ❌ ${dep} - MISSING`);
      allFilesPresent = false;
    }
  });

  // Check scripts
  const requiredScripts = ['start', 'build', 'test'];
  console.log('\n⚡ Checking npm scripts:');
  requiredScripts.forEach(script => {
    if (packageJson.scripts?.[script]) {
      console.log(`  ✅ ${script}`);
    } else {
      console.log(`  ❌ ${script} - MISSING`);
      allFilesPresent = false;
    }
  });

} catch (error) {
  console.log(`  ❌ package.json - ERROR: ${error.message}`);
  allFilesPresent = false;
}

// Check component imports
console.log('\n🔗 Checking component imports:');
const componentsToCheck = [
  'src/App.js',
  'src/index.js'
];

componentsToCheck.forEach(filePath => {
  const fullPath = path.join(projectRoot, filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    if (content.includes('import React') || content.includes('from \'react\'')) {
      console.log(`  ✅ ${filePath} has React imports`);
    } else {
      console.log(`  ⚠️  ${filePath} may be missing React imports`);
    }
  }
});

// Check CSS file size
console.log('\n🎨 Checking CSS file:');
const cssPath = path.join(projectRoot, 'src/styles/main.css');
if (fs.existsSync(cssPath)) {
  const stats = fs.statSync(cssPath);
  const fileSizeKB = Math.round(stats.size / 1024);
  console.log(`  ✅ main.css exists (${fileSizeKB} KB)`);

  if (fileSizeKB > 50) {
    console.log(`  ✅ CSS file has substantial content`);
  } else {
    console.log(`  ⚠️  CSS file may be too small`);
  }
}

// Summary
console.log('\n📊 SUMMARY:');
if (allFilesPresent) {
  console.log('✅ All required files and dependencies are present!');
  console.log('\n🚀 To start the application:');
  console.log('   1. cd Proto/react-app');
  console.log('   2. npm install');
  console.log('   3. npm start');
  console.log('\n🌐 The app will be available at http://localhost:3000');
} else {
  console.log('❌ Some files or dependencies are missing.');
  console.log('   Please check the missing items above.');
}

console.log('\n✨ Verification complete!');
