const express = require('express');
const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');
const cors = require('cors'); // Add this

const app = express();
const upload = multer({ dest: 'uploads/' });

// Add CORS middleware
app.use(cors());
app.use(express.static('public'));

app.post('/convert', upload.array('images'), async (req, res) => {
    try {
        const pdfDoc = await PDFDocument.create();
        
        // Validate files first
        const validFiles = req.files.filter(file => 
            ['image/jpeg', 'image/png'].includes(file.mimetype)
        );

        if (validFiles.length === 0) {
            return res.status(400).json({ error: 'No valid images (JPG/PNG only)' });
        }

        for (const file of validFiles) {
            try {
                const imagePath = path.join(__dirname, file.path);
                const imageBytes = fs.readFileSync(imagePath);
                
                const image = file.mimetype === 'image/png' 
                    ? await pdfDoc.embedPng(imageBytes)
                    : await pdfDoc.embedJpg(imageBytes);

                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, { 
                    x: 0, 
                    y: 0, 
                    width: image.width, 
                    height: image.height 
                });
                
                fs.unlinkSync(imagePath); // Cleanup
            } catch (fileError) {
                console.error(`Error processing ${file.originalname}:`, fileError);
            }
        }

        if (pdfDoc.getPageCount() === 0) {
            return res.status(400).json({ error: 'Could not process any images' });
        }

        const pdfBytes = await pdfDoc.save();
        
        // Set proper headers
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=converted.pdf',
            'Content-Length': pdfBytes.length
        });
        
        res.send(pdfBytes);

    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
