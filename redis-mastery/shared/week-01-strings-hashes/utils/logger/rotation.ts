import { createStream } from 'rotating-file-stream';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const rotateFileStream = createStream('app.log', {
    size: '10M',
    interval: '1d',
    compress: 'gzip',
    maxFiles: 30,
    path: path.join(__dirname, 'logs')
});




export {
    rotateFileStream
}


// Rotation Recommendations:

// Size limit: 10MB per file
// Time-based rotation: Daily
// Compression: Enable for storage efficiency
// Retention: Keep logs min for 30 days
// Naming: Include timestamp in rotated files