# HSA Video Compressor

A command-line tool for compressing and optimizing video files. This utility reads video files from a specified directory, compresses them, and saves the optimized versions to another specified directory. It uses the FFmpeg library to support common video formats such as .mp4, .mov, .avi, and .mkv.

## Features

Reads video files from the input directory.
Saves optimized and compressed videos to the specified output directory.
Supports video formats: .mp4, .mov, .avi, .mkv.
Allows user-defined video quality and resolution.
Uses FFmpeg for fast and efficient video processing.

## Installation

To install the project globally, use the following command:

## bash

npm install -g hsa-video-compressor

# Usage

hsa-video-compressor -i <input_directory> -o <output_directory> -q <quality> -s <resolution>

## Parameters

 <ul>
    <li>
      -i, --input <dir>: The input directory containing the video files you want to process.
    </li>
    <li>
     -o, --output <dir>: The output directory where the optimized videos will be saved. If not specified, an output_optimized_video folder will be created in the current directory.
    </li>
    <li>
      -q, --quality <number>: Video quality (0-51). Lower values result in better quality. The default value is 23.
    </li>
    <li>
    -s, --size <widthxheight>: The output resolution for the video (e.g., 1280x720). The default value is 1280x720.
    </li>
 </ul>

# Licence

hsa-video-compressor - Material Design is an open source project that is licensed under the MIT license.
