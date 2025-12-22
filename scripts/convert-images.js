const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(__dirname, '../public/products/גרפיטי');
const OUTPUT_DIR = path.join(__dirname, '../public/products/new');
const TEMP_DIR = path.join(__dirname, '../temp-conversion');

// Category folder mappings to English names
const folderMappings = {
  'דפי A4 להדפסה': 'a4-printables',
  'כרטיסי ברכה': 'greeting-cards',
  'לוח תכנון יומי': 'daily-planner',
  'לוח תכנון שבועי': 'weekly-planner',
  'מארז קטן מעטפות ואיגרות': 'envelopes-small',
  'מארזי מעטפות בינוני': 'envelopes-medium',
  'מארזי מעטפות גדולות': 'envelopes-large',
  'מגנטים ': 'magnets',
  'מחברות ספירלה ': 'spiral-notebooks',
  'מחברות שורות': 'lined-notebooks',
  'ספר מתכונים': 'recipe-books',
  'פנקס יומן': 'daily-journal',
  'רשימת קניות': 'shopping-lists',
};

function convertHeicToJpeg(inputPath, outputPath) {
  try {
    // Use sips (macOS built-in) to convert HEIC to JPEG
    execSync(`sips -s format jpeg "${inputPath}" --out "${outputPath}"`, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`Error converting HEIC: ${error.message}`);
    return false;
  }
}

function convertToWebp(inputPath, outputPath) {
  try {
    const sharp = require('sharp');
    // Synchronous conversion using sharp
    execSync(`node -e "require('sharp')('${inputPath}').webp({ quality: 85 }).toFile('${outputPath}')"`);
    return true;
  } catch (error) {
    // Try using sips as fallback
    try {
      execSync(`sips -s format png "${inputPath}" --out "${outputPath.replace('.webp', '.png')}"`, { stdio: 'pipe' });
      // Then use sharp for png to webp
      const sharp = require('sharp');
      sharp(outputPath.replace('.webp', '.png'))
        .webp({ quality: 85 })
        .toFile(outputPath)
        .then(() => {
          fs.unlinkSync(outputPath.replace('.webp', '.png'));
        });
      return true;
    } catch (e) {
      console.error(`Error converting to WebP: ${e.message}`);
      return false;
    }
  }
}

async function convertImage(inputPath, outputPath, baseName) {
  const ext = path.extname(inputPath).toLowerCase();
  const sharp = require('sharp');
  
  try {
    if (ext === '.heic') {
      // First convert HEIC to JPEG using sips
      const tempJpeg = path.join(TEMP_DIR, `${baseName}.jpg`);
      execSync(`sips -s format jpeg "${inputPath}" --out "${tempJpeg}"`, { stdio: 'pipe' });
      
      // Then convert JPEG to WebP using sharp
      await sharp(tempJpeg)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      // Clean up temp file
      fs.unlinkSync(tempJpeg);
      console.log(`✓ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
      return true;
    } else {
      // Direct conversion for JPG/PNG
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      console.log(`✓ Converted: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
      return true;
    }
  } catch (error) {
    console.error(`✗ Error converting ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

async function processDirectory(sourceFolder, outputFolder) {
  const files = fs.readdirSync(sourceFolder);
  let converted = 0;
  let failed = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (['.heic', '.jpg', '.jpeg', '.png'].includes(ext)) {
      const baseName = path.basename(file, ext);
      const inputPath = path.join(sourceFolder, file);
      const outputPath = path.join(outputFolder, `${baseName}.webp`);
      
      const success = await convertImage(inputPath, outputPath, baseName);
      if (success) converted++;
      else failed++;
    }
  }

  return { converted, failed };
}

async function main() {
  console.log('Starting image conversion...\n');
  
  // Create output and temp directories
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
  }

  let totalConverted = 0;
  let totalFailed = 0;

  // Get all folders in source directory
  const folders = fs.readdirSync(SOURCE_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  for (const folder of folders) {
    // Find the English mapping for this folder
    let englishName = null;
    for (const [hebrewName, engName] of Object.entries(folderMappings)) {
      if (folder === hebrewName || folder.trim() === hebrewName.trim()) {
        englishName = engName;
        break;
      }
    }

    if (!englishName) {
      console.log(`⚠ Skipping unknown folder: ${folder}`);
      continue;
    }

    const sourceFolder = path.join(SOURCE_DIR, folder);
    const outputFolder = path.join(OUTPUT_DIR, englishName);

    // Create output subfolder
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    console.log(`\n📁 Processing: ${folder} -> ${englishName}`);
    const { converted, failed } = await processDirectory(sourceFolder, outputFolder);
    totalConverted += converted;
    totalFailed += failed;
  }

  // Clean up temp directory
  if (fs.existsSync(TEMP_DIR)) {
    fs.rmSync(TEMP_DIR, { recursive: true });
  }

  console.log('\n========================================');
  console.log(`✅ Total converted: ${totalConverted}`);
  console.log(`❌ Total failed: ${totalFailed}`);
  console.log('========================================\n');
}

main().catch(console.error);
