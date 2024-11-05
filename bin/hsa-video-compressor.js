#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const ffmpeg = require("fluent-ffmpeg");
const { Command } = require("commander");

const program = new Command();

program
  .version("1.0.0")
  .option("-i, --input <dir>", "Input directory")
  .option("-o, --output <dir>", "Output directory")
  .option("-q, --quality <number>", "Video quality (0-51, lower is better)", 23) // Default quality is 23
  .option("-s, --size <widthxheight>", "Output resolution (e.g., 1280x720)", "1280x720"); // Default resolution is 1280x720

program.parse(process.argv);

const options = program.opts();
const input = options.input || process.cwd(); // Default to current directory
const output = options.output || path.join(process.cwd(), 'output_optimized_video'); // Default output folder
const resolution = options.size; // Video resolution (e.g., 1280x720)

console.log(`Using resolution: ${resolution}`);

// Create output directory if it doesn't exist
if (!fs.existsSync(output)) {
  fs.mkdirSync(output, { recursive: true });
}

// Process all files in the input directory
fs.readdir(input, (err, files) => {
  if (err) {
    console.error("Unable to read the directory:", err);
    return;
  }

  files.forEach((file) => {
    const filePath = path.join(input, file);
    const outputFilePath = path.join(output, file);
    const extname = path.extname(file).toLowerCase();

    // Only process video files
    if (['.mp4', '.mov', '.avi', '.mkv'].includes(extname)) {
      ffmpeg(filePath)
        .videoCodec('libx264') // Use H.264 video codec
        .audioCodec('aac') // Use AAC audio codec
        .videoBitrate('1000k') // Set target bitrate (adjust based on quality needs)
        .audioBitrate('128k') // Set audio bitrate
        .size(resolution) // Set resolution (user-provided or default)
        .outputOptions([
          `-crf ${options.quality}`, // CRF value for quality (lower is better)
          '-preset fast' // Encoding speed (can be `ultrafast`, `fast`, `medium`, etc.)
        ])
        .on('end', () => {
          console.log(`Processed: ${file}`);
        })
        .on('error', (err) => {
          console.error(`Error occurred while processing ${file}:`, err);
        })
        .save(outputFilePath);
    } else {
      console.log(`Skipping unsupported file format: ${file}`);
    }
  });
});
