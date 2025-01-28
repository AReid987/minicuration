# MiniCuration Upload Spec

1. Set Up the Next.js App
Start by creating a new Next.js app:

```bash
Copy
npx create-next-app@latest minicuration-app
cd minicuration-app
```

2. Install Required Dependencies
You’ll need the following libraries:

sharp for image processing (resizing, rotating, etc.).

formik or react-hook-form for form handling.

yup for form validation.

axios or fetch for API requests (if needed).

Install them:

```bash
Copy
npm install sharp formik yup axios
```

3. Create the Image Upload and Processing Feature
Frontend: Image Upload and Rotation
Use an <input type="file"> for image upload.

Allow users to rotate the image using a button (e.g., "Rotate 90°").

Display a preview of the image.

Example:

```jsx
Copy
import { useState } from 'react';

export default function ImageUpload() {
  const [image, setImage] = useState(null);
  const [rotation, setRotation] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const rotateImage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div>
      <input type="file" accept=".jpg,.jpeg,.bmp,.png,.gif,.tif,.tiff" onChange={handleImageUpload} />
      {image && (
        <div>
          <img
            src={image}
            alt="Uploaded"
            style={{ transform: `rotate(${rotation}deg)` }}
          />
          <button onClick={rotateImage}>Rotate 90°</button>
        </div>
      )}
    </div>
  );
}
```

Backend: Image Processing
Use sharp to resize the image to a minimum resolution of 816 x 1110 pixels (300 DPI).

Validate the file size (max 32 MB) and type.

Example API route (/api/process-image):

```javascript
Copy
import sharp from 'sharp';
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { image } = req.body;

  try {
    const buffer = Buffer.from(image.split(',')[1], 'base64');
    const processedImage = await sharp(buffer)
      .resize(816, 1110, { fit: 'inside', withoutEnlargement: true })
      .toBuffer();

    res.setHeader('Content-Type', 'image/jpeg');
    res.send(processedImage);
  } catch (error) {
    res.status(500).json({ message: 'Image processing failed', error });
  }
}
```

4. Create the Form
Use formik and yup for the form with fields: Artist, Title, Medium, and Concept.

Example:

```jsx
Copy
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  artist: Yup.string().required('Required'),
  title: Yup.string().required('Required'),
  medium: Yup.string().required('Required'),
  concept: Yup.string().required('Required'),
});

export default function ArtForm() {
  const formik = useFormik({
    initialValues: {
      artist: '',
      title: '',
      medium: '',
      concept: '',
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        name="artist"
        value={formik.values.artist}
        onChange={formik.handleChange}
        placeholder="Artist"
      />
      {/* Repeat for other fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

5. Generate Limited Edition Copies
Use sharp to overlay the text Limited edition Minicuration n of 50 on the image.

Generate 50 copies, each with a unique number (n).

Example:

```javascript
Copy
const generateEditions = async (imageBuffer) => {
  const editions = [];
  for (let i = 1; i <= 50; i++) {
    const edition = await sharp(imageBuffer)
      .composite([
        {
          input: Buffer.from(`Limited edition Minicuration ${i} of 50`),
          gravity: 'south',
        },
      ])
      .toBuffer();
    editions.push(edition);
  }
  return editions;
};
```

6. Deploy the App
Deploy the Next.js app to a platform like Vercel, Netlify, or Ionos.

Ensure the app is publicly accessible.

7. Integrate with Minicuration.com
Option 1: Iframe Embed
Add an iframe to the Minicuration site pointing to your Next.js app:

html
```Copy
<iframe src="https://your-nextjs-app-url.com" width="100%" height="800px"></iframe>
```

Run HTML
Option 2: Navigation Link
Add a new navigation link to the Minicuration site that redirects to your Next.js app:

```html
Copy
<a href="https://your-nextjs-app-url.com">Create MiniCuration</a>
```

Run HTML
8. Additional Considerations
Authentication: If needed, integrate authentication (e.g., using NextAuth.js).

Storage: Store processed images and form data in a cloud storage service (e.g., AWS S3, Firebase Storage).

Performance: Optimize image processing for large files.

