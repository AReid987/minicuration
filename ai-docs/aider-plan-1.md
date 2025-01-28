## Plan to implement MiniCuration Upload App based on `ai-docs/spec.md`

### 1. Setup Next.js App
- Use `create-next-app` to bootstrap a new Next.js application named `minicuration-app`.
- Navigate into the `minicuration-app` directory.
  ```bash
  npx create-next-app@latest minicuration-app
  cd minicuration-app
  ```

### 2. Install Dependencies
- Install necessary packages: `sharp`, `formik`, `yup`, and `axios`.
  ```bash
  pnpm add sharp formik yup axios
  ```

### 3. Implement Image Upload and Processing
- **Frontend:** Create an image upload component in `page.tsx` (or a separate component file).
    - Use `<input type="file">` for image selection.
    - Implement image rotation functionality using a button and CSS `transform: rotate()`.
    - Display a preview of the uploaded image.
- **Backend:** Create an API route `/api/process-image` in `pages/api`.
    - Use `sharp` to:
        - Resize the image to a minimum of 816x1110 pixels (300 DPI).
        - Validate file size (max 32 MB) and type.
    - Return the processed image.

### 4. Implement Art Form
- Create a form component using `formik` and `yup` for validation.
- Include fields for: Artist, Title, Medium, and Concept.

### 5. Generate Limited Edition Copies
- Implement a function to generate 50 limited edition copies of the processed image.
- Use `sharp` to overlay "Limited edition Minicuration n of 50" text on each image, with unique numbers (1 to 50).

### 6. Integrate with Minicuration.com (Choose one option)
- **Option 1: Iframe Embed:**  Provide instructions to embed the Next.js app into Minicuration.com using an `<iframe>`.
- **Option 2: Navigation Link:** Provide instructions to add a navigation link on Minicuration.com that redirects to the Next.js app.

### 7. Additional Considerations (To be addressed later if needed)
- Authentication: Implement user authentication if required.
- Storage: Configure cloud storage (e.g., AWS S3) for processed images and form data if persistent storage is needed.
- Performance: Optimize image processing for large files if performance issues arise.
